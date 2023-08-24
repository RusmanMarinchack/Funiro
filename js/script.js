"use strict"

const swiperHome = new Swiper('.home-slider__swiper', {
    spaceBetween: 32,
    slidesPerView: 1,
    speed: 1000,
    navigation: {
        nextEl: '.home-slider__swiper-button-next',
        prevEl: '.home-slider__swiper-button-prev',
      },
      pagination: {
        el: '.home-slider__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"><span></span></span>';
        },
      },
});

const swiperBonus = new Swiper('.bonus__swiper', {
    spaceBetween: 24,
    slidesPerView: 1,
    speed: 1000,
    navigation: {
        nextEl: '.bonus__swiper-button-next',
        prevEl: '.bonus__swiper-button-prev',
      },
      pagination: {
        el: '.bonus__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"><span></span></span>';
        },
      },
});

const swiperTipsTricks = new Swiper('.tips-tricks__swiper', {
    slidesPerView: 3,
    spaceBetween: 25,
    speed: 1000,
    navigation: {
        nextEl: '.tips-tricks__swiper-button-next',
        prevEl: '.tips-tricks__swiper-button-prev',
      },
      pagination: {
        el: '.tips-tricks__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"><span></span></span>';
        },
      },
      breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1023: {
            slidesPerView: 3,
        }
    }
});

// Перевірка наявності слайдів для приховування навігації
function toggleNavigation() {
    var isNavigationHidden = swiperHome.slides.length <= 1;
    var navigationElements = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
    
    navigationElements.forEach(function(element) {
      element.style.display = isNavigationHidden ? 'none' : 'block';
    });
  }

  // Виклик функції при завантаженні та зміні слайдів
  swiperHome.on('init', toggleNavigation);
  swiperHome.on('slideChange', toggleNavigation);

// Перевірка на сенсорні екрани, і додаємо класс для body.
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBorry: function() {
        return navigator.userAgent.match(/BlackBorry/i);
    },
    IOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBorry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()){
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc');
}

let events = document.body.classList.contains('_touch') ? 'click' : 'mousemove';

// Робимо бургер меню.
function burger() {
    let burger = document.querySelector('.header__burger')
    let innerNav = document.querySelector('.header__inner')

    if(burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active')
            innerNav.classList.toggle('active')
        })
    }
}
burger()

// // Робимо акардеони по сайту.
function accardeonsSite() {
    let accardeons = document.querySelectorAll('.accardeons')

    if (accardeons.length > 0) {
        accardeons.forEach(accardeon => {
            let accardeonHeader = accardeon.querySelectorAll('.accardeons__header')

            if (accardeonHeader.length > 0) {
                accardeonHeader.forEach(header => {
                    header.addEventListener('click', function () {
                        let body = this.nextElementSibling
                        let bodyHeight = body.scrollHeight

                        if (this.classList.contains('active')) {
                            this.classList.remove('active');
                            body.classList.remove('active');
                            body.style.height = `0px`;
                        } else {
                            removeClassActive();
                            this.classList.add('active');
                            body.classList.add('active');
                            body.style.height = `${bodyHeight}px`;
                        }
                    });
                });

                // Видаляємо клас active в accardeonHeader.
                function removeClassActive() {
                    accardeonHeader.forEach(header => {
                        header.classList.remove('active');
                        let body = header.nextElementSibling;
                        if (body) {
                            body.classList.remove('active');
                            body.style.height = `0px`;
                        }
                    });
                }
            }
        });
    }
}

accardeonsSite()


// При скролі додаємо класс для header щоб зафіксувати.
function fixedHeader() {
    let header = document.querySelector('.header')
    
    if(header && window.matchMedia("(min-width: 1023.98px)").matches) {
        document.addEventListener('scroll', function() {
            if(window.scrollY > 0) {
                header.classList.add('fixed')
            } else {
                header.classList.remove('fixed')
            }
        })
    }
}
fixedHeader()


// Робимо щоб під списки можна було відкривати по табу, якщо сенсорний екран.
function touchSubList() {
    let navItem = document.querySelectorAll('.sublist-item')

    if(navItem.length > 0) {
        if(document.body.classList.contains('_touch')) {
            navItem.forEach(item => {
                item.addEventListener('click', function() {
                    if(this.classList.contains('active')) {
                        this.classList.remove('active')
                    } else {
                        removeActive() 
                        this.classList.add('active')
                    }
                })
            })
            
        }

        function removeActive() {
            navItem.forEach(item => {
                item.classList.remove('active')
            })
        }


    }
}
touchSubList()



// // Робимо активні попапи посайту.
function activePopap() {
    let popapBtn = document.querySelectorAll('.popap-btn')
    let footerRow = document.querySelectorAll('.footer-wrapper__row')

    if(popapBtn.length > 0) {
        popapBtn.forEach(btn => {
            btn.addEventListener('click', function() {
                let idPopap = this.dataset.id

                if(idPopap) {
                    let popap = document.querySelector(`#${idPopap}`)

                    if(popap) {
                        popap.classList.add('active')
                        
                        let btnClose = popap.querySelector('.popap__close')

                        popap.addEventListener('click', function(e) {
                            e.stopPropagation()
                        })

                        let popapShadow = popap.parentNode

                        if(popapShadow) {
                            popapShadow.classList.add('active')

                            popapShadow.addEventListener('click', popapHidden)
                            btnClose.addEventListener('click', popapHidden)

                            function popapHidden() {
                                popapShadow.classList.remove('active')
                                popap.classList.remove('active')
                            }
                        }
                    }
                }
            })
        })
    }

    
    if(window.matchMedia("(min-width: 767px)").matches) {
        console.log(1)
        footerRow.forEach(item => {
            if(item.classList.contains("accardeons")) {
                item.classList.remove("accardeons")
            }
        })
    }
} 
activePopap()