function closeModal(modalSelector, closeBtn) {

    const modal = document.querySelector(modalSelector),
        modalCloseBtn = document.querySelector(closeBtn);

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

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        closeBtn = document.querySelector('[data-close]');
    modal.style.cssText = 'display: block;';
    document.body.style.overflow = 'hidden';
    closeModal(modalSelector, closeBtn);

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, closeBtn, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        modalCloseBtn = document.querySelector(closeBtn);

    function showElementByBtns(triggers, element, closeBtn, func) {
        triggers.forEach(value => {
            if (func) {
                value.addEventListener('click', () => func(modalSelector));
            } else {
                value.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (event.target && event.target.classList.contains('btn')) {
                        element.style.cssText = 'display: block;';
                        document.body.style.overflow = 'hidden';
                    }
                    closeModal(modalSelector, modalCloseBtn);
                })
            }
        })
    }


    showElementByBtns(modalTrigger, modal, modalCloseBtn, openModal);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
            clearInterval(modalTimerId);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};