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










// 정답입력 키보드 대응(ios) 
let prevVisualViewport = 0;
const handleVisualViewportResize = () => {
  if (isIos && modal_opened) { //ios인 상태에서 모달이 오픈되면
    const currentVisualViewport = window.visualViewport.height; //visualViewPort의 height를 가져옵니다.
    if (currentVisualViewport < prevVisualViewport) {
      const scrollHeight = window.document.scrollingElement.scrollHeight;
      const scrollTop = scrollHeight - window.visualViewport.height;

      window.scrollTo({ top: scrollTop, behavior: 'smooth' }); // 입력창이 키보드에 가려지지 않도록 조절
    }

    prevVisualViewport = window.visualViewport.height;
  }
 };

if (isIOS) {
  window.visualViewport.onresize = handleVisualViewportResize;
  //visualViewPort가 변경될 때 마다 호출
}

