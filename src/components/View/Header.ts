import { IHeaderData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Header extends Component<IHeaderData> {
    private readonly basketButton: HTMLButtonElement;
    private readonly counterElement: HTMLElement;

    constructor(container: HTMLElement, protected readonly events: IEvents) {
        super(container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', container);
        this.basketButton.addEventListener('click', () => this.events.emit(appEvents.basketOpen));
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}
