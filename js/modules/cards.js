import {getResource} from "../services/services";

function cards() {
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



    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price})=> {
    //             new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

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
}

export default cards;