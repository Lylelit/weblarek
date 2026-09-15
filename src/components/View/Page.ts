import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IPageData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class Page extends Component<IPageData> {
    private readonly galleryElement: HTMLElement;
    private readonly basketButton: HTMLButtonElement;
    private readonly counterElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.galleryElement = ensureElement<HTMLElement>('.gallery', container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);
        this.basketButton.addEventListener('click', () => events.emit(appEvents.basketOpen));
    }

    set catalog(items: HTMLElement[]) {
        this.galleryElement.replaceChildren(...items);
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}
