// 스크롤 시 애니메이션 트리거
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible'); // visible 클래스 추가
        }
    });
});

// 캐러셀 제어
const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentIndex = 0;

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < carouselWrapper.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

function updateCarousel() {
    const offset = -currentIndex * carouselWrapper.children[0].offsetWidth;
    carouselWrapper.style.transform = `translateX(${offset}px)`;
}

// 스크롤 애니메이션을 위한 JavaScript
window.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about');
    const projectsSection = document.querySelector('.projects');
    const certificationSection = document.querySelector('.certification');
    const educationSection = document.querySelector('.education');
    const careerSection = document.querySelector('.career');
    const toolSection = document.querySelector('.tool');

    const fadeInSection = (section) => {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if(sectionPos < screenPos) {
            section.style.animation = 'fadeInUp 1s ease-in-out forwards';
        }
    };
    fadeInSection(aboutSection);
    fadeInSection(projectsSection);
    fadeInSection(certificationSection);
    fadeInSection(educationSection);
    fadeInSection(careerSection);
    fadeInSection(toolSection);
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const wrapper = document.querySelector('.carousel-wrapper');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    window._carouselIntervalId = window._carouselIntervalId || null;
    let intervalId = window._carouselIntervalId;
    const intervalTime = 2000; // 2초 간격
    
    // 캐러셀 아이템 너비 조정 (부모 요소 기준)
    function setItemWidth() {
        const carouselWidth = carousel.offsetWidth;
        items.forEach(item => {
            item.style.width = `${carouselWidth}px`;
        });
        updateCarousel();
    }
    
    // 캐러셀 위치 업데이트
    function updateCarousel() {
        const carouselWidth = carousel.offsetWidth;
        wrapper.style.transform = `translateX(-${currentIndex * carouselWidth}px)`;
    }
    
    // 다음 슬라이드로 이동
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }
    
    // 이전 슬라이드로 이동
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }
    
    // 자동 슬라이드 시작
    function startAutoSlide() {
        // avoid multiple intervals
        if (window._carouselIntervalId) return;
        // immediately move to next slide so user sees instant reaction
        if (items && items.length > 0) nextSlide();
        window._carouselIntervalId = setInterval(nextSlide, intervalTime);
        intervalId = window._carouselIntervalId;
        window._isCarouselPlaying = true;
    }
    
    // 자동 슬라이드 정지
    function stopAutoSlide() {
        if (!window._carouselIntervalId) return;
        clearInterval(window._carouselIntervalId);
        window._carouselIntervalId = null;
        intervalId = null;
        window._isCarouselPlaying = false;
    }

    window._doStartAutoSlide = startAutoSlide;
    window._doStopAutoSlide = stopAutoSlide;

    if (window._requestedCarouselStart) {
        startAutoSlide();
        window._requestedCarouselStart = false;
    }
    if (window._requestedCarouselStop) {
        stopAutoSlide();
        window._requestedCarouselStop = false;
    }
    
    // 이벤트 리스너 설정
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // 마우스 호버 시 자동 슬라이드 일시 정지 (자동재생은 수동으로 시작되어야 함)
    carousel.addEventListener('mouseenter', () => { if (intervalId) stopAutoSlide(); });

    // 초기 설정 (자동 슬라이드 기본 OFF)
    setItemWidth();
    
    // 윈도우 리사이즈 대응
    window.addEventListener('resize', setItemWidth);

    // play / stop 아이콘으로 자동 슬라이드 제어
    const playBtn = document.querySelector('.playicon');
    const stopBtn = document.querySelector('.stopicon');
    if (playBtn) {
        playBtn.style.cursor = 'pointer';
        playBtn.addEventListener('click', () => {
            // 재생: 자동 슬라이드 시작
            startAutoSlide();
        });
    }
    if (stopBtn) {
        stopBtn.style.cursor = 'pointer';
        stopBtn.addEventListener('click', () => {
            // 일시정지: 자동 슬라이드 정지
            stopAutoSlide();
        });
    }
}); 

// 모달 열고 닫는 동작 처리하는 코드
document.addEventListener('DOMContentLoaded', () => {
    const modalBtns = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

// 팝업이 열릴 때 동영상 자동 재생
document.addEventListener('DOMContentLoaded', () => {
    const modalBtns = document.querySelectorAll('.open-modal');
    const closeBtns = document.querySelectorAll('.close');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';

            // 비디오 자동 재생
            const video = modal.querySelector('video');
            if (video) {
                video.play();
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';

            // 비디오 정지
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0; // 비디오 시간 초기화
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';

            // 비디오 정지
            const video = event.target.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkModeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    // 다크 모드 상태를 localStorage에서 불러오기
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
    }

    // 토글 버튼 클릭 이벤트
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // 다크 모드 상태를 localStorage에 저장
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        } else {
            localStorage.setItem('darkMode', null);
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        }
    });
});

// Provide safe global start/stop wrappers so inline onclick works even if clicked
// before DOMContentLoaded. These will call the real handlers when available.
window._requestedCarouselStart = false;
window._requestedCarouselStop = false;
window.startAutoSlide = function() {
    window._requestedCarouselStart = true;
    if (typeof window._doStartAutoSlide === 'function') {
        window._doStartAutoSlide();
        window._requestedCarouselStart = false;
    }
};
window.stopAutoSlide = function() {
    window._requestedCarouselStop = true;
    if (typeof window._doStopAutoSlide === 'function') {
        window._doStopAutoSlide();
        window._requestedCarouselStop = false;
    }
};