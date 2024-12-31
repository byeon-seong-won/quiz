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
            // step3
            if (idx === 2) { 
                $('.btn-area.flex .swiper-button-prev').html('이전');
                $('.btn-area.flex .swiper-button-next').html('미션 시작');
            }
            // step4
            if (idx === 3) { 
                $('.btn-area.flex .swiper-button-prev').html('다시 확인하기');
                $('.btn-area.flex .swiper-button-next').html('정답 입력');
            }
            else if(!(idx === 2 || idx === 3)) {
                $('.btn-area.flex .swiper-button-prev').html('이전');
                $('.btn-area.flex .swiper-button-next').html('다음');
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




// 키워드복사하기 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.img-box .keyword').forEach(button => {
        button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
    });
});










// 이전 다음 클릭시
