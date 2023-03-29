import tabs from './modules/tabs.js';
import modal, {openModal} from './modules/modal.js';
import timer from './modules/timer.js';
import cards from './modules/cards.js';
import calc from './modules/calc.js';
import forms from './modules/forms.js';
import slider from './modules/slider.js';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000),
        deadline = '2023-04-15';

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', '[data-close]', modalTimerId);
    timer('.timer',deadline);
    cards();
    forms('form',modalTimerId);
    calc();
    slider({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        slide: '.offer__slide',
        counter: '.offer__slider-counter',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next'
    });

});