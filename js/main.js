"use strict";

window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(index = 0) {
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');

        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContent()
    showTabContent()
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    // Timer

    const deadline = '2023-04-15';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds

        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    function showElementByBtns(triggers, element, closeBtn, func) {
        triggers.forEach(value => {
            if (func) {
                value.addEventListener('click', func)
            } else {
                value.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (event.target && event.target.classList.contains('btn')) {
                        element.style.cssText = 'display: block;';
                        document.body.style.overflow = 'hidden';
                    }
                    closeElement(closeBtn, element);
                })
            }
        })
    }

    function closeElement(closeBtn, element) {

        function _close(item) {
            item.style.cssText = 'display: none;';
            document.body.style.overflow = 'scroll';
        }

        closeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target) {
                _close(element);
            }
        })
        element.addEventListener('click', (event) => {
            if (event.target === element) {
                _close(element);
            }
        })
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                _close(element);
            }
        })
    }

    function _openModal() {
        modal.style.cssText = 'display: block;';
        document.body.style.overflow = 'hidden';
        closeElement(modalCloseBtn, modal);
        clearInterval(modelTimerId);
    }


    showElementByBtns(modalTrigger, modal, modalCloseBtn, _openModal);

    const modelTimerId = setTimeout(_openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            _openModal();
            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modelTimerId)
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Class for Cards

    class MenuItem{
        constructor(src, alt, subtitle, describe, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.describe = describe;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.currency = 36;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price *= this.currency
        }

        render(){
            const element = document.createElement('div');

            element.innerHTML = `<div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.describe}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`;
            this.parent.append(element);
        }
    }

    new MenuItem('img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих\n' +
        'овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой\n' +
        'и высоким качеством!',
        30,
        '.menu .container').render();

    new MenuItem('img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода ресторан!',
        20,
        '.menu .container').render();

    new MenuItem('img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container').render();
    
    // FORMS

    const messages = {
        loading: 'loading',
        success: 'success',
        fail: 'fail'
    }

    const forms = document.querySelectorAll('form');

    forms.forEach(item=>{
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', event=>{
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status__messages');
            statusMessage.textContent = messages.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();

            request.open('POST', '../server.php');
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value;
            })

            const json = JSON.stringify(obj);


            request.send(json)


            request.addEventListener('load', ()=>{
                if (request.status === 200) {
                    statusMessage.textContent = messages.success;
                    console.log(request.response);
                    form.reset();
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 2000)

                }else{
                    statusMessage.textContent = messages.fail;
                }
            });
        });
    }
});