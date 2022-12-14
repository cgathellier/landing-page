import ObserversManager, { Observer } from '../ObserversManager.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';
import IconHamburger from '../../../images/icon-hamburger.svg';
import IconClose from '../../../images/icon-close.svg';

export type Action = 'OPEN' | 'CLOSE';

class Button {
	private $button: HTMLButtonElement | null = document.querySelector('.header__menu-button');
	private $body: HTMLBodyElement = document.querySelector('body')!;
	private AnimationManager = new ObserversManager<Observer<Action>, Action>();
	private MenuObs = new MenuObserver();
	private BackdropObs = new BackdropObserver();

	constructor() {
		this.AnimationManager.subscribe(this.MenuObs);
		this.AnimationManager.subscribe(this.BackdropObs);

		this.listen();
	}

	isMenuOpen(): boolean {
		const icon: HTMLImageElement | null | undefined = this.$button?.querySelector('img');

		if (icon?.getAttribute('alt') === 'Close menu') {
			return true;
		} else {
			return false;
		}
	}

	updateInterface() {
		if (!this.$button) return;

		if (this.isMenuOpen()) {
			this.AnimationManager.fire('CLOSE');
			this.$button.innerHTML = `<img src="${IconHamburger}" alt="Open menu" />`;
			this.$body.classList.remove('body-no-scroll');
		} else {
			this.AnimationManager.fire('OPEN');
			this.$button.innerHTML = `<img src="${IconClose}" alt="Close menu" />`;
			this.$body.classList.add('body-no-scroll');
		}
	}

	listen() {
		// click on button
		this.$button?.addEventListener('click', () => this.updateInterface());

		// click on backdrop
		this.BackdropObs.$backdrop?.addEventListener('click', () => this.updateInterface());
	}
}

const button = new Button();
