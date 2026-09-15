import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBasketData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement, formatPrice } from '../../utils/utils';

export class BasketView extends Component<IBasketData> {
    private readonly listElement: HTMLElement;
    private readonly totalElement: HTMLElement;
    private readonly orderButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.listElement = ensureElement<HTMLElement>('.basket__list', container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', container);
        this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.orderButton.addEventListener('click', () => events.emit(appEvents.basketOrder));
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.totalElement.textContent = formatPrice(value);
    }

    set valid(value: boolean) {
        this.orderButton.disabled = !value;
    }
}
