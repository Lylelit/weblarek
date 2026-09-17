import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ISuccessData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { formatPrice } from '../../utils/customUtils';

export class Success extends Component<ISuccessData> {
    private readonly descriptionElement: HTMLElement;
    private readonly closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected readonly events: IEvents) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
        this.closeButton.addEventListener('click', () => this.events.emit(appEvents.successClose));
    }

    set total(value: number) {
        this.descriptionElement.textContent = `Списано ${formatPrice(value)}`;
    }
}
