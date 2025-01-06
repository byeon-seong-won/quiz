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
        // 초기 세팅
        init: function() {
            $('.swiper-button-prev, .swiper-button-next').hide(); 
            $('.btn-area').show(); 
            keywordAni();
        },
        // 슬라이드 전환시
        slideChange: function() {
            const idx = this.realIndex;
            
            // step1
            if (idx === 0) { 
                keywordAni();
                $('.swiper-button-prev, .swiper-button-next').hide(); 
                $('.btn-area').show(); 
            } else {
                $('.swiper-button-prev, .swiper-button-next').show(); 
                $('.btn-area').hide(); 
            }

            // step2
            if (idx === 1) { 
                const skipTxt = '<button>가이드 건너뛰기</button>';
                $('.swiper-button-wrap').prepend(skipTxt);
                step2_animation.goToAndStop(0, true);
                step2_animation.play();
            
            } else {
                $('.swiper-button-wrap button').remove();
            }

            // step3
            if (idx === 2) { 
                $('.swiper-button-wrap .swiper-button-prev').html('이전');
                $('.swiper-button-wrap .swiper-button-next').html('미션 시작');
                step3_animation.goToAndStop(0, true);
                step3_animation.play();
            }

            // step4
            if (idx === 3) { 
                const imgTag = '<a href="#" class="banner"><img src="assets/img/banner.png" alt="설명 텍스트"></a>';
                $('.swiper').append(imgTag);
                $('.swiper-button-wrap .swiper-button-prev').html('다시 확인하기');
                $('.swiper-button-wrap .swiper-button-next').html('정답 입력');
                $('.swiper-button-wrap').css('transform', 'translateY(-48px)');
                $('.input-block-wrap input:nth-of-type(1)').focus();
            } else {
                $('.swiper .banner').remove();
                $('.swiper-button-wrap').css('transform', 'translateY(0)');
            }

            if(!(idx === 2 || idx === 3)) {
                $('.swiper-button-wrap .swiper-button-prev').html('이전');
                $('.swiper-button-wrap .swiper-button-next').html('다음');
            }
        }
    }
});








//________________________ step별 애니메이션 ________________________//
const step2_animation = lottie.loadAnimation({
  container: document.getElementById('step02'),
  path: 'assets/json/hash_step2.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
});
const step3_animation = lottie.loadAnimation({
  container: document.getElementById('step03'),
  path: 'assets/json/hash_step3.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
});
//________________________ step별 애니메이션 ________________________//











//________________________ 키워드복사하기 애니메이션 ________________________//
function keywordAni() {
    document.querySelectorAll('.cont-area .img-box .keyword').forEach(button => {
        button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>';
    });
    setTimeout(() => {
        $('.cont-area .img-box .keyword').addClass('animate');

        setTimeout(() => {
            const txt = '키워드 복사하기';
            $('.cont-area .img-box .keyword').each(function() {
                const keywordSpans = $(this).find('span');

                keywordSpans.each(function(index) {
                    if (index < txt.length) {
                        $(this).text(txt.charAt(index)); 
                    } else {
                        $(this).text(''); 
                    }
                });
            });
        }, 200)
    }, 500)
}
//________________________ 키워드복사하기 애니메이션 ________________________//











//________________________ 정답입력 키보드 대응(ios) ________________________//
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
//________________________ 정답입력 키보드 대응(ios) ________________________//











//________________________step별 팝업창________________________//
// step1 키워드복사클릭시 팝업창
$('.btn-area button').click(function() {
    $('.pop-wrap.step01').addClass('on')
})

$('.pop-wrap .step01-btn').click(function() {
    swiper.slideTo(1);
    $('.pop-wrap.step01').removeClass('on')
})


// step2 상품비교 확인 팝업창
// $('.swiper-button-next').click(function() {
//     $('.pop-wrap.step02').addClass('on')
// })
// $('.pop-area .step02-btn').click(function() {
//     swiper.slideTo(2);
//     $('.pop-wrap.step02').removeClass('on')
// })

// $('.swiper-button-next').click(function() {
//     $('.pop-wrap.step03').addClass('on')
// })
//________________________step별 팝업창________________________//











//________________________ 문의하기 팝업창 ________________________//
$('.btn-faq').click(function() {
    $('.sub-pop.faq').addClass('on');
})





//________________________ 문의하기 팝업창 ________________________//










// --------------------- vibration api : 오답인경우 실행 --------------------- //
function vibrateDevice() {
    if ("vibrate" in navigator) {
        alert('vibrationnnnn')
        navigator.vibrate([200]); 
    } else {
        alert("Vibration API를 지원하지 않습니다.");
    }
}










// 포커스 변경 방지
// const inputElement = document.getElementById('myInput');

// document.addEventListener('touchstart', (event) => {
//   if (!inputElement.contains(event.target)) {
//     event.preventDefault(); 
//     inputElement.focus();
//   }
// });