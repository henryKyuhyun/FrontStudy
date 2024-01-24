export default class ImageSlider {
  // 밑에 이건 정리하는용이다. 굳이 안해도 되는거같음

  #currentPositoin = 0;

  #sliderNumber = 0;

  #sliderWidth = 0;

  #intervalId;

  #autoPlay = true;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSLiderWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoplay();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  initSliderNumber() {
    this.#sliderNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSLiderWidth() {
    this.#sliderWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${
      this.#sliderNumber * this.#sliderWidth
    }px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
    this.controlWrapEl.addEventListener('click', this.togglePlay.bind(this));
  }

  togglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play');
      this.controlWrapEl.classList.remove('pause');
      this.initAutoplay();
    } else if (event.target.dataset.status === 'pause') this.#autoPlay = false;
    this.controlWrapEl.classList.remove('play');
    this.controlWrapEl.classList.add('pause');
    clearInterval(this.#intervalId);
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10); // 10진법으로 바꿧다는 뜻
    if (Number.isInteger(indexPosition)) {
      this.#currentPositoin = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#sliderWidth * this.#currentPositoin
      }px`;
      this.setIndicator();
    }
  }

  moveToRight() {
    this.#currentPositoin += 1;
    if (this.#currentPositoin === this.#sliderNumber) {
      this.#currentPositoin = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPositoin
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }

    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPositoin -= 1;
    if (this.#currentPositoin === -1) {
      this.#currentPositoin = this.#sliderNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#sliderWidth * this.#currentPositoin
    }px`;
    if (this.#autoPlay) {
      clearInterval(this.#intervalId);
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
    }
    this.setIndicator();
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    // 에어비엔비 룰때문에 i++ 를 못한다.
    for (let i = 0; i < this.#sliderNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    // index 활성화 없음
    // index 에 따라서 활성화
    this.indicatorWrapEl
      .querySelector('li.activle')
      ?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPositoin + 1})`)
      .classList.add('active');
  }
}
