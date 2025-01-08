// step01 팝업창
const pop_step01 = `
<div class="slide-pop step01">
    <div class="dimmedarea"></div>
    <div class="pop-area">
        <div class="txt-box">
            <span class="bar"></span>
            <p>키워드가 복사되었어요</p>
            <p>검색창에 붙여넣기 해주세요</p>
            <p class="desc">상세페이지를 펼쳐 해시태그를 찾아주세요</p>
        </div>
        <button>이어하기</button>
    </div>  
</div>
`;
// step02 팝업창
const pop_step02 = `
<div class="slide-pop step02">
    <div class="dimmedarea"></div>
    <div class="pop-area">
        <div class="txt-box">
            <p>가격비교 페이지로 랜딩할 경우,</p>
            <p><span class="mark">반드시 문제에 해당하는 판매처</span>를 찾아</p>
            <p>클릭해주세요</p>
        </div>
        <img src="./assets/img/hash-pop-01.png" alt="가격비교 페이지로 랜딩할 경우, 반드시 문제에 해당하는 판매처를 찾아 클릭해주세요">
        <button>네, 확인했어요</button>
    </div>
</div>
`;
// step03 팝업창
const pop_step03 = `
<div class="slide-pop step03">
    <div class="dimmedarea"></div>
    <div class="pop-area">
        <div class="txt-box">
            <p>복사한 키워드를 검색창에 붙여넣고,</p>
            <p><span class="mark">아래 상품을 찾아주세요</span></p>
        </div>
        <div class="img-box">
            <img src="./assets/img/prd.png" alt="복사한 키워드를 검색창에 붙여넣고,아래 상품을 찾아주세요">
        </div>
        <div class="info-box">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quisquam?<span>공식</span></p>
            <p>17,800원</p>
        </div>
        <button>검색하러가기</button>
        <span class="adtxt">&apos;광고&#9432;&apos; 상품은 클릭하지 마세요!</span>
    </div>
</div>
`;





// 전체 swiper
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
            keywordAni();

            // ---- step1 팝업창 ---- 
            $('.btn-area button').click(function() {
                $('.wrap').append(pop_step01);
                $('.slide-pop.step01 button').click(function() {
                    swiper.slideTo(1);
                    $('.slide-pop.step01').remove();
                })
            })
            // ---- step1 팝업창 ---- 
        },
        // 슬라이드 전환시
        slideChange: function() {
            const idx = this.realIndex;

            // step2
            if (idx === 1) { 
                step2_animation.goToAndStop(0, true);
                step2_animation.play();

                // ---- step2 팝업창 ---- 
                $('.step02 .swiper-button-next').click(function() {
                    $('.wrap').append(pop_step02);
                    $('.slide-pop.step02 button').click(function() {
                        swiper.slideTo(2);
                        $('.slide-pop.step02').remove();
                    })
                })
                // ---- step2 팝업창 ---- 
            } 

            // step3
            if (idx === 2) { 
                step3_animation.goToAndStop(0, true);
                step3_animation.play();

                // ---- step3 팝업창 ---- 
                $('.step03 .swiper-button-next').click(function() {
                    $('.wrap').append(pop_step03);
                    $('.slide-pop.step03 button').click(function() {
                        // ~~~~~ 검색하러가기 사이트 이동 ~~~~~ 
                        $('.slide-pop.step03').remove();
                    })
                })
                // ---- step3 팝업창 ---- 
            }

            // step4
            if (idx === 3) { 

                const imgTag = '<a href="#" class="banner"><img src="assets/img/banner.png" alt="설명 텍스트"></a>';
                $('.wrap').prepend(imgTag);
                $('.swiper-button-wrap').css('transform', 'translateY(-34px)');
                // $('.input-block-wrap input:nth-of-type(1)').focus();
            } else {
                $('.wrap .banner').remove();
                $('.swiper-button-wrap').css('transform', 'translateY(0)');
            }
        }
    }
});








//________________________ step별 애니메이션 ________________________//
const step2_animation = lottie.loadAnimation({
  container: document.getElementById('lottie-step02'),
  path: 'assets/json/hash_step2.json',
  renderer: 'svg',
  loop: 2,
  autoplay: true,
});


const step3_animation = lottie.loadAnimation({
  container: document.getElementById('lottie-step03'),
  path: 'assets/json/hash_step3.json',
  renderer: 'svg',
  loop: 2,
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











// // //________________________ 정답입력 키보드 대응(ios) 참고 ________________________//
// let prevVisualViewport = 0;
// const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent); // iOS 디바이스인지 체크

// const handleVisualViewportResize = () => {
//   if (isIos && modal_opened) { //ios인 상태에서 모달이 오픈되면
//     const currentVisualViewport = window.visualViewport.height; //visualViewPort의 height를 가져옵니다.
//     if (currentVisualViewport < prevVisualViewport) {
//       const scrollHeight = window.document.scrollingElement.scrollHeight;
//       const scrollTop = scrollHeight - window.visualViewport.height;
//       window.scrollTo({ top: scrollTop, behavior: 'smooth' }); // 입력창이 키보드에 가려지지 않도록 조절
//     }
//     prevVisualViewport = window.visualViewport.height;
//   }
//  };
// if (isIOS) {
//   window.visualViewport.onresize = handleVisualViewportResize; //visualViewPort가 변경될 때 마다 호출
// }
// // //________________________ 정답입력 키보드 대응(ios) ________________________//







//________________________ sub-pop 팝업창 로티 애니메이션 ________________________//
const pop01_animation = lottie.loadAnimation({
    container: document.getElementById('pop01'), 
    path: 'assets/json/pop-01.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
const pop02_animation = lottie.loadAnimation({
    container: document.getElementById('pop02'), 
    path: 'assets/json/pop-02.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
const pop03_animation = lottie.loadAnimation({
    container: document.getElementById('pop03'), 
    path: 'assets/json/pop-chk.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
// const pop04_animation = lottie.loadAnimation({
//     container: document.getElementById('pop04'), 
//     path: 'assets/json/pop-04.json',
//     renderer: 'svg', 
//     loop: true,
//     autoplay: true, 
// });
const pop05_animation = lottie.loadAnimation({
    container: document.getElementById('pop05'),
    path: 'assets/json/pop-fail.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
const pop06_animation = lottie.loadAnimation({
    container: document.getElementById('pop06'),
    path: 'assets/json/pop-fail.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
const pop07_animation = lottie.loadAnimation({
    container: document.getElementById('pop07'), 
    path: 'assets/json/pop-chk.json',
    renderer: 'svg', 
    loop: 2,
    autoplay: true, 
});
//________________________ sub-pop 팝업창 로티 애니메이션 ________________________//






// --------------------- vibration api : 오답인경우 실행 --------------------- //
// function vibrateDevice() {
//     if ("vibrate" in navigator) {
//         alert('vibration')
//         navigator.vibrate([100, 50, 100, 50, 100]);
//     } else {
//         alert("Vibration API를 지원하지 않습니다.");
//     }
// }
// --------------------- vibration api : 오답인경우 실행 --------------------- //









// 가이드 건너뀌기
$('.skip').click(function() {
    $('.wrap').append(pop_step03);
    $('.slide-pop.step03 button').click(function() {
        // ~~~~~ 검색하러가기 사이트 이동 ~~~~~ 
        $('.slide-pop.step03').remove();
    })
})