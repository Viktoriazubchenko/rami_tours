window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // tabs

    let tab = document.querySelectorAll('.info__tab'),
        info = document.querySelector('.info__tabs'),
        tabContent = document.querySelectorAll('.info__content');

        function hideTabContent(a){
            for (let i = a; i < tabContent.length; i ++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }
        }
        
        hideTabContent(1);
        
        function showTabContent(b){
                if (tabContent[b].classList.contains('hide')){
                    tabContent[b].classList.remove('hide');
                    tabContent[b].classList.add('show');
                }
        }
        
        function pressBtn(c){
            tab.forEach(function(i){
              i.addEventListener('click', function(event) {
                  if (i.classList.contains('pressed')){
                     i.classList.remove('pressed');
                  } else {
                    event.target.classList.add('pressed');
                  }   
              });    
            });
        }
        
        
        
        info.addEventListener('click', function(event) {
        
            let target = event.target;
            if (target && target.classList.contains('info__tab')) {
                for (let i = 0; i < tab.length; i ++) {
                    if (target == tab[i]) {
                        hideTabContent(0);
                        showTabContent(i);
                        target.classList.add('pressed');
                        break;
                    } else {
                        tab[i].classList.remove('pressed');
                    }
                }
            }
        });

    // timer

    // let saleEnd = '2020-12-31';

    // function getTimeRemaining(endtime){
    //     let time = Date.parse(endtime) - Date.parse(new Date());
    //     let seconds = Math.floor((time/1000) % 60);
    //     let minutes = Math.floor((time/1000/60) % 60);
    //     let hours = Math.floor((time/(1000*60*60)));

    //     return {
    //         'total': time,
    //         'hours': hours,
    //         'minutes': minutes,
    //         'seconds': seconds
    //     };
    // }

    // function setClock(id, endtime){
        
    // }
    let deadline = '2020-12-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Slider

    let slideIndex = 1;
    let slides = document.querySelectorAll('.slider__item');
    let prev = document.querySelector('.shadow_prev');
    let next = document.querySelector('.shadow_next');
    let dotsWrap = document.querySelector('.slider__dots');
    let dots = document.querySelectorAll('.dot');
    function showSlides(num){
        if( num > slides.length){
            slideIndex = 1;
        }
        if( num < 1){
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function changeSlide(num){
        showSlides(slideIndex += num);
    }

    function currentSlide(num){
        showSlides(slideIndex = num);
    } 

    prev.addEventListener('click', function(){
        changeSlide(-1);
    });
    next.addEventListener('click', function(){
        changeSlide(1);
    });
     
    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length + 1; i++){
            if( event.target.classList.contains('dot') && event.target == dots[i - 1]){
                currentSlide(i);
            }
        }
    });

    // Calculator 

    let persons = document.querySelectorAll('.calculator__block-input')[0];
    let days = document.querySelectorAll('.calculator__block-input')[1];
    let place = document.getElementById('select');
    let totalValue = document.getElementById('total');
    let personsSum = 0;
    let daysSum = 0;
    let total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function(){
        personsSum = +this.value;
        total = (personsSum * daysSum) * 400;
        if(days.value == ''){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    days.addEventListener('change', function(){
        daysSum = +this.value;
        total = (personsSum * daysSum) * 400;
        if(persons.value == ''){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function(){
        if(persons.value == '' || days.value == ''){
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

    // Modal 


    let more = document.querySelector('.timer__btn');
    let overlay = document.querySelector('.overlay');
    let close = document.querySelector('.popup__close');

    

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Hamburger 

    let hamburger = document.querySelector('.hamburger');
    let header = document.querySelector('.header');
    let headerNav = document.querySelector('.header__nav');
    let headerList = document.querySelector('.header__list');

    hamburger.addEventListener('click', function(){
        this.classList.toggle('active');
        header.classList.toggle('active');
        headerNav.classList.toggle('active');
        headerList.classList.toggle('active');
        document.body.classList.toggle('screen-block');
        header.classList.toggle('fade');
    });
   
    let headerLinks = document.querySelectorAll('.header__link');

    headerLinks.forEach(function(link){
        link.addEventListener('click', function(){
          header.classList.remove('active');
          hamburger.classList.remove('active');
          headerNav.classList.remove('active');
          headerList.classList.remove('active');
          document.body.classList.remove('screen-block');
        });
    });


    


    
});

