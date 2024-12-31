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
        init: function() {
            // 초기 세팅 (첫번째 슬라이드만)
            $('.swiper-button-prev, .swiper-button-next').hide(); 
            $('.btn-area.copy').show(); 

        },
        slideChange: function() {
            const idx = this.realIndex;

            // step1
            if (idx === 0) { 
                $('.swiper-button-prev, .swiper-button-next').hide(); 
                $('.btn-area.copy').show(); 
            } else {
                $('.swiper-button-prev, .swiper-button-next').show(); 
                $('.btn-area.copy').hide(); 
            }

            // step2
            if (idx === 1) { 
                const skipTxt = '<button>가이드 건너뛰기</button>';
                $('.btn-area.flex').prepend(skipTxt);
                step2_animation.goToAndStop(0, true);
                step2_animation.play();
            
            } else {
                $('.btn-area.flex button').remove();
            }

            // step3
            if (idx === 2) { 
                $('.btn-area.flex .swiper-button-prev').html('이전');
                $('.btn-area.flex .swiper-button-next').html('미션 시작');
                step3_animation.goToAndStop(0, true);
                step3_animation.play();
            }

            // step4
            if (idx === 3) { 
                const imgTag = '<img src="../assets/img/banner.png" alt="설명 텍스트" class="banner">';
                $('.swiper').append(imgTag);
                $('.btn-area.flex .swiper-button-prev').html('다시 확인하기');
                $('.btn-area.flex .swiper-button-next').html('정답 입력');
            } else {
                $('.swiper .banner').remove();
            }

            if(!(idx === 2 || idx === 3)) {
                $('.btn-area.flex .swiper-button-prev').html('이전');
                $('.btn-area.flex .swiper-button-next').html('다음');
            }
        }
    }
});





// 로티애니메이션 로드
// Lottie 애니메이션 로드
const step2_animation = lottie.loadAnimation({
  container: document.getElementById('step02'),
  path: '/assets/json/hash_step2.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
});
const step3_animation = lottie.loadAnimation({
  container: document.getElementById('step03'),
  path: '/assets/json/hash_step3.json',
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
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent); // iOS 디바이스인지 체크

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
  window.visualViewport.onresize = handleVisualViewportResize; //visualViewPort가 변경될 때 마다 호출
}






// 정답입력 텍스트 입력시 초기화버튼 노출
$('.code-input-block button').addClass('on');


// 정답입력 초기화버튼
function reset(){
	document.querySelectorAll("input[type=text]")[0].value="";
}





// 가이드건너뛰기 클릭시









// --------------------- 팝업창 관련 --------------------- //

// step1 키워드복사클릭시 팝업창
$('.btn-area.copy button').click(function() {
    $('.pop-wrap.step01').addClass('on')
})

$('.pop-area .step01-btn').click(function() {
    swiper.slideTo(1);
    $('.pop-wrap.step01').removeClass('on')
})



// step2 상품비교 확인 팝업창
$('.swiper-button-next').click(function() {
    $('.pop-wrap.step02').addClass('on')
})
$('.pop-area .step02-btn').click(function() {
    swiper.slideTo(2);
    $('.pop-wrap.step02').removeClass('on')
})



// step3 검색하기 팝업창
$('.swiper-button-next').click(function() {
    $('.pop-wrap.step03').addClass('on')
})


