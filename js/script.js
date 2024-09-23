$(document).ready(function(){

    //슬라이드
    function slide(){
        $('.slide ul').animate({left: "-100%"},1300,function(){
            $('.slide ul').append($('.slide ul li').first());
            $('.slide ul').css({left: 0});
        })
    }
    setInterval(slide, 3800)


    // 반응형 
    checkWindowSize();
    $(window).resize(function(){
        checkWindowSize();        
    });

    function checkWindowSize(){
        var windowWidth = $(window).width();

        if (windowWidth >= 1200) {
            // pc 
            // 기존 모바일, 태블릿에서 설정한 클릭 이벤트 해제
            $('.btn-menu, .btn-cls').off('click');
            $('nav>ul>li').off('click focusin focusout');

            

            // pc 전용 마우스 이벤트 추가
            $('nav>ul>li').off('mouseover mouseout') // 이벤트 중복 방지를 위해 기존 이벤트 해제
                .on('mouseover', function(){
                    $('.sub, .menubg').stop().slideDown();
                }).on('mouseout', function(){
                    $('.sub, .menubg').stop().slideUp();
                })   

            // pc에서는 nav가 항상 보이도록.
            $('nav').css({left: "300px"}); 

        } else {
            // mobile + tablet
            // pc에서 설정한 마우스 이벤트 제거
            $('nav>ul>li').off('mouseover mouseout');

            // nav 초기상태 설정
            $('nav').css({left: "-300px"});

            // 모바일 메뉴 열기/닫기 
            $('.btn-menu').click(function(){
                $('nav').css({left: 0});
            });
            $('.btn-cls').click(function(){
                $('nav').css({left: "-100%"}); 
            });

            $('.sub').slideUp();
            //서브메뉴 
            $('nav>ul>li').click(function(){
                $(this).children('.sub').stop().slideToggle();
                $(this).siblings().children('.sub').slideUp();
            });


            // 포커스
            $('.btn-menu').focusin(function(){
                $('nav').css({left: "0"});
            })
            $('nav>ul>li:last-child li:last-child').focusout(function(){
                $('nav').css({left: "-100%"}); // '.btn-cls'에 포커스 마지막으로 오고, 한번더 어떤 동작하면 nav가 닫히게 하고 싶은데 못했다.
            })



            // 서브 메뉴가 열릴 때 포커스 관련 이벤트 처리
            $('nav>ul>li').focusin(function(){
                $(this).children('.sub').stop().slideToggle();
            })
            $('nav>ul>li').focusout(function(){
                $(this).siblings().find('.sub').stop().slideUp();
            })

        }
    }

});


            
                                   