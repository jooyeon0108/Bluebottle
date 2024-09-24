$(document).ready(function(){

    //슬라이드(swiper)
    let swiper = new Swiper('.swiper', {
        spaceBetween: 30,
        effect: 'fade',
        observer: true,
        observeParents: true,
        loop: true,
        autoplay : {
            delay: 3200,
            disableOnInteraction: false // 사용자 인터랙션 후에도 autoplay 재시작
        },
        speed: 1000,
        
        // 페이지네이션 
        pagination: {   // 슬라이드 넘버
          el: '.swiper-pagination',
          clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

     // 브레이크포인트  
     checkWindowSize();
     $(window).resize(function(){
         checkWindowSize();   
         
         swiper.update();
         swiper.autoplay.start();
     });
 
     function checkWindowSize(){
         var windowWidth = $(window).width();
 
         if (windowWidth >= 1200) {
             // pc 

             // Swiper autoplay가 PC 전환 시 멈추지 않도록 재시작
             swiper.autoplay.start(); 

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
             
             // 모바일/태블릿 전환 시에도 Swiper autoplay가 멈추지 않도록 보장
             swiper.autoplay.start();

             // pc 마우스 이벤트 제거
             $('nav>ul>li').off('mouseover mouseout');
 
             // nav 초기상태 설정
             $('nav').css({left: "-100%"});
 
             // 메뉴 열기/닫기 
             $('.btn-menu').click(function(){
                 $('nav').animate({left: "0"});
             });
             $('.btn-cls').click(function(){
                 $('nav').css({left: "-100%"}); 
             });
 
             // 서브메뉴 
             $('nav>ul>li').click(function(){
                 $(this).children('.sub').stop().slideToggle();
                 $(this).siblings().children('.sub').slideUp();
             });
             $('.sub').slideUp();
 
             // 포커스 이벤트
             $('.btn-menu').focusin(function(){
                 $('nav').animate({left: "0"});
             })
 
             // 서브 메뉴 열릴 때 포커스 관련 이벤트 
             $('nav>ul>li').focusin(function(){
                 $(this).children('.sub').stop().slideDown();
             })
             $('nav>ul>li').focusout(function(){
                 $('.sub').stop().slideUp();
             })
             $('nav>ul>li:last-child li:last-child').focusout(function(){
                $('nav').animate({left: "-100%"});
             })   
         }
     }

});


            
                                   