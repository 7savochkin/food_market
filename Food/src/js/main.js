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
});