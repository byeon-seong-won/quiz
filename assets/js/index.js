var swiper = new Swiper('.swiper', {
    simulateTouch: false, 
    touchRatio: 0, 
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChange: function() {
            const idx = this.realIndex;


            
            // step2
            if (idx === 1) { 
                animation.goToAndStop(0, true);
                animation.play();
            }
        }
    }

});



// 로티애니메이션 로드드
  // Lottie 애니메이션 로드
  const animation = lottie.loadAnimation({
    container: document.getElementById('step02'),
    path: '../assets/json/hash_step2.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });


  lottie.loadAnimation({
    container: document.getElementById('step03'),
    path: '../assets/json/number_step3.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });





document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.img-box .keyword').forEach(button => {
        button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
    });
});










// 이전 다음 클릭시
