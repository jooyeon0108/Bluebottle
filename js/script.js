$(document).ready(function(){

    // 슬라이드
    // function slide(){
    //     $('.slide ul').animate({left: "-100%"},1300,function(){
    //         $('.slide ul').append($('.slide ul li').first());
    //         $('.slide ul').css({left: 0});
    //     })
    // }
    // setInterval(slide, 3800)

    // 슬라이드
    let swiper = new Swiper('.swiper', {
        // Optional parameters
        spaceBetween: 30,

        effect: 'fade',
        observer: true,
        observeParents: true,
        loop: true,
        autoplay : {
            delay: 3000,
            disableOnInteraction: false // 사용자 인터랙션 후에도 autoplay 재시작
        },
        speed: 1000,
        
        // If we need pagination
        pagination: {   // 슬라이드 넘버
          el: '.swiper-pagination',
          clickable: true
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      
    });
    


    // 반응형 
    checkWindowSize();
    $(window).resize(function(){
        checkWindowSize();        
    });

    function checkWindowSize(){
        let windowWidth = $(window).width();

        if (windowWidth >= 1200) {
            // pc 
            // 기존 모바일, 태블릿에서 설정한 클릭 이벤트 해제
            $('.btn-menu, .btn-cls').off('click');
            $('nav>ul>li').off('click focusin focusout');

            // nav 기본상태 설정
            $('nav').css({left: "300px"}); 

            // pc 전용 마우스 이벤트 추가
            $('nav>ul>li').off('mouseover mouseout') // 이벤트 중복 방지를 위해 기존 이벤트 해제
                .on('mouseover', function(){
                    $('.sub, .menubg').stop().slideDown();
                }).on('mouseout', function(){
                    $('.sub, .menubg').stop().slideUp();
                })   

            // Swiper autoplay가 PC 전환 시 멈추지 않도록 재시작
            // swiper.autoplay.start(); 

        } else {
            // mobile + tablet
            // pc에서 설정한 마우스 이벤트 제거
            $('nav>ul>li').off('mouseover mouseout');

            // 초기 상태 nav 숨기기
            $('nav').css({left: "-100%"});

            // 모바일 메뉴 열기/닫기 애니메이션
            $('.btn-menu').click(function(){
                $('nav').css({left: 0});
            });
            $('.btn-cls').click(function(){
                $('nav').css({left: "-100%"});
            });
             // 포커스
            $('.btn-menu').focusin(function(){
                $('nav').css({left: 0});
            })
            $('nav>ul>li:last-child li:last-child').focusout(function(){
                $('nav').css({left: "-100%"}); // '.btn-cls'에 포커스 마지막으로 오고, 한번더 어떤 동작하면 nav가 닫히게 하고 싶은데 못했다.
            })


            $('nav>ul>li').off('click').on('click', function(){
                // 클릭한 메뉴의 서브 메뉴만 슬라이드 토글(펼치거나 숨김) 
                $(this).find('.sub').stop().slideDown();
                // 다른 서브 메뉴를 모드 슬라이드 업(숨김)
                $(this).siblings().find('.sub').stop().slideUp();                
            })

            // 서브 메뉴가 열릴 때 포커스 관련 이벤트 처리
            $('nav>ul>li').focusin(function(){
                $(this).find('.sub').stop().slideDown();
            })
            $('nav>ul>li').focusout(function(){
                $(this).find('.sub').stop().slideUp();
            })

            // 모바일/태블릿 전환 시에도 Swiper autoplay가 멈추지 않도록 보장
            // swiper.autoplay.start();
        }
    }

});


            
                                   