import calc from "./calc";

function slider({container, slide, nextArrow, prevArrow, counter, wrapper, inner}) {
    const slider = document.querySelector(container),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = sliderWrapper.querySelector(inner),
        slides = sliderInner.querySelectorAll(slide),
        sliderCounter = document.querySelector(counter),
        prevSlide = sliderCounter.querySelector(prevArrow),
        nextSlide = sliderCounter.querySelector(nextArrow),
        widthSlide = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1,
        offset = 0;

    sliderInner.style.width = 100 * slides.length + "%";
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = widthSlide);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
    `

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.style.cssText = `
              box-sizing: content-box;
              flex: 0 1 auto;
              width: 30px;
              height: 6px;
              margin-right: 3px;
              margin-left: 3px;
              cursor: pointer;
              background-color: #fff;
              background-clip: padding-box;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              opacity: .5;
              transition: opacity .6s ease;
        `;
        dot.setAttribute('data-slide-to', i + 1);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    const switchToDigit = (str) => +str.replace(/\D/g, '');

    sliderCounter.querySelector('#current').textContent = getZero(slideIndex);
    sliderCounter.querySelector('#total').textContent = getZero(slides.length);

    nextSlide.addEventListener('click', () => {
        if (offset == switchToDigit(widthSlide) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += switchToDigit(widthSlide)
            slideIndex++;
        }
        sliderCounter.querySelector('#current').textContent = getZero(slideIndex)
        sliderInner.style.transform = `translateX(-${offset}px)`

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset += switchToDigit(widthSlide) * (slides.length - 1);
            slideIndex += slides.length - 1;
        } else {
            offset -= switchToDigit(widthSlide)
            slideIndex--;
        }
        sliderCounter.querySelector('#current').textContent = getZero(slideIndex)
        sliderInner.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', event => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = switchToDigit(widthSlide) * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
            sliderCounter.querySelector('#current').textContent = getZero(slideIndex);

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;