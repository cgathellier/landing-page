import Dots from './Dots.js';

class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private $slides: NodeListOf<HTMLElement> | null =
		document.querySelectorAll('.testimonials__slide');
	private numberOfSlides = this.$slides?.length || 0;
	private _currentSlide: number = 0;
	private _prevSlide: number = this.numberOfSlides - 1;
	private _nextSlide: number = 1;

	private translationStartClientX = 0;
	private translationMoveClientX = 0;
	private sliderOffset = 0;
	private translationOffset = 0;

	private Dots = new Dots();

	constructor() {
		this.listen();
	}

	goPrevSlide() {
		if (this._currentSlide !== 0) {
			this.Dots.update(this._currentSlide, this._prevSlide);
			this._nextSlide = this._currentSlide;
			this._currentSlide = this._prevSlide;
			this._prevSlide = this._prevSlide - 1;
		}
	}

	goNextSlide() {
		if (this._currentSlide !== this.numberOfSlides - 1) {
			this.Dots.update(this._currentSlide, this._nextSlide);
			this._prevSlide = this._currentSlide;
			this._currentSlide = this._nextSlide;
			this._nextSlide = this._nextSlide + 1;
		}
	}

	applyTranslation(value: number) {
		this.$slider?.setAttribute('style', `transform: translateX(${value}%)`);
	}

	computeTranslation() {
		const translation =
			(this.translationMoveClientX / this.translationStartClientX) * 100 - 100;
		const rounded = Math.round((translation + Number.EPSILON) * 100) / 100;
		this.translationOffset = rounded;
		this.applyTranslation(rounded + this.sliderOffset);
	}

	alignSlider(value: number) {
		this.$slider?.classList.add('testimonials__slider--smoothTransition');
		this.applyTranslation(value);
		setTimeout(() => {
			this.$slider?.classList.remove('testimonials__slider--smoothTransition');
		}, 300);
		this.sliderOffset = value;
	}

	handleTouchEnd() {
		this.sliderOffset += this.translationOffset;
		if (this.sliderOffset > 0) {
			this.alignSlider(0);
		} else if (this.sliderOffset < -300) {
			this.alignSlider(-300);
		}

		const rest = Math.abs(this.sliderOffset % 100);

		// de gauche à droite mais translation < 30% ==> on revient à l'image actuelle
		if (this.translationStartClientX > this.translationMoveClientX && rest <= 30) {
			this.alignSlider(this.sliderOffset + rest);
		}

		// de gauche à droite mais translation > 30% ==> on passe à l'image suivante
		else if (this.translationStartClientX > this.translationMoveClientX && rest > 30) {
			this.alignSlider(this.sliderOffset - (100 - rest));
			this.goNextSlide();
		}

		// de droite à gauche mais translation > 30% ==> on passe à l'image précédente
		else if (this.translationStartClientX < this.translationMoveClientX && rest < 70) {
			this.alignSlider(this.sliderOffset + rest);
			this.goPrevSlide();
		}

		// de droite à gauche mais translation < 30% ==> on revient à l'image actuelle
		else if (this.translationStartClientX < this.translationMoveClientX && rest >= 70) {
			this.alignSlider(this.sliderOffset - (100 - rest));
		}
	}

	listen() {
		const _ = this;

		function handleTouchMove(this: HTMLElement, ev: TouchEvent) {
			_.translationMoveClientX = ev.touches[0].clientX;
			_.computeTranslation();
		}
		function handleTouchEnd(this: HTMLElement, ev: TouchEvent) {
			_.$slider?.removeEventListener('touchmove', handleTouchMove as EventListener);
			_.handleTouchEnd();
			_.$slider?.removeEventListener('touchend', handleTouchEnd as EventListener);
		}
		function handleTouchStart(this: HTMLElement, ev: TouchEvent) {
			_.translationStartClientX = ev.touches[0].clientX;
			_.$slider?.addEventListener('touchmove', handleTouchMove as EventListener);
			_.$slider?.addEventListener('touchend', handleTouchEnd as EventListener);
		}
		this.$slider?.addEventListener('touchstart', handleTouchStart as EventListener);

		function handleMouseMove(this: HTMLElement, ev: MouseEvent) {
			_.translationMoveClientX = ev.clientX;
			_.computeTranslation();
		}
		function handleMouseUp(this: HTMLElement, ev: MouseEvent) {
			_.$slider?.removeEventListener('mousemove', handleMouseMove as EventListener);
			_.handleTouchEnd();
			_.$slider?.removeEventListener('mouseup', handleMouseUp as EventListener);
		}
		function handleMouseDown(this: HTMLElement, ev: MouseEvent) {
			_.translationStartClientX = ev.clientX;
			_.$slider?.addEventListener('mousemove', handleMouseMove as EventListener);
			_.$slider?.addEventListener('mouseup', handleMouseUp as EventListener);
		}
		this.$slider?.addEventListener('mousedown', handleMouseDown as EventListener);
	}
}

const slider = new Slider();
