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
                    closeModal();
                })
            }
        })
    }

    function closeModal() {


        function _close(item) {
            item.style.cssText = 'display: none;';
            document.body.style.overflow = 'scroll';
        }

        modalCloseBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target) {
                _close(modal);
            }
        })
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.getAttribute('data-close') == '') {
                _close(modal);
            }
        })
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                _close(modal);
            }
        })
    }

    function openModal() {
        modal.style.cssText = 'display: block;';
        document.body.style.overflow = 'hidden';
        closeModal();
        clearInterval(modelTimerId);
    }


    showElementByBtns(modalTrigger, modal, modalCloseBtn, openModal);

    const modelTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modelTimerId)
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Class for Cards


    class MenuItem {
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

        changeToUAH() {
            this.price *= this.currency
        }

        render() {
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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could no fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price})=> {
    //             new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    getResource('http://localhost:3000/menu')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');

            element.innerHTML = `
            <div class="menu__item">
                <img src="${img}" alt="${altimg}">
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }

    // FORMS

    const messages = {
        loading: 'img/form/spinner.svg',
        success: 'success',
        fail: 'fail'
    }

    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        bindpostData(item);
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    }

    function bindpostData(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(json)

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(messages.success);
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(messages.fail);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
});