$(document).ready(function () {
    let swiper = new Swiper('.swiper', {
        loop: true,
        spaceBetween: 30,
        speed: 1000,
        effect: 'fade',
        observer: true,
        observeParents: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    }); // swiper

    function checkWindowSize () {
        let windowWidth = $(window).width();

        if (windowWidth >= 1024) {
            // pc
            swiper.autoplay.start();

            $('.btn-cls, .btn-menu').off('click');
            $('nav>ul>li').off('click');

            $('nav>ul>li').off('mouseover mouseout').on('mouseover', function () {
                $('.sub, .menubg').stop().slideDown();
            }).on('mouseout', function () {
                $('.sub, .menubg').stop().slideUp();
            });

            // 모바일에 남아있는 클래스 초기화
            $('nav>ul>li .sub').removeClass('show').hide();

        } else {
            // mobile + table
            swiper.autoplay.start();

            // 초기화
            $('nav').css({left: '-100%'});
            $('nav>ul>li').off('click mouseover mouseout');
            $('nav>ul>li .sub').removeClass('show').hide();  // 메뉴 숨김 초기화
            $('.sub').css({height: 'unset'});
            
            // 메뉴 열고 닫기
            $('.btn-menu').off('click').on('click', function(){
                $('nav').css({left: 0});
            });
            $('.btn-cls').off('click').on('click', function(){
                $('nav').css({left: '-100%'});
            });

            // 모바일 메뉴 클릭
            $('nav>ul>li').off('click').on('click', function(){
                $(this).children('.sub').stop().slideToggle().toggleClass('show');
                $(this).siblings().children('.sub').stop().slideUp().removeClass('show');
            });   
        }
    }

    checkWindowSize();
    $(window).resize(function(){
        checkWindowSize();

        swiper.update();
        swiper.autoplay.start();
    });
})