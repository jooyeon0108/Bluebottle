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



     // 반응형 
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

             // pc에서 설정한 마우스 이벤트 제거
             $('nav>ul>li').off('mouseover mouseout');
 
             // nav 초기상태 설정
             $('nav').css({left: "-100%"});
 
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


            
                                   