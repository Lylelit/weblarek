import { IOrderFormData, TPayment } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureAllElements, ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Form } from './Form';

export class OrderForm extends Form<IOrderFormData> {
    private readonly paymentButtons: HTMLButtonElement[];
    private readonly addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events, appEvents.orderSubmit);
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.order__buttons button', container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', container);

        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit(appEvents.buyerChange, {
                    field: 'payment',
                    value: button.name,
                });
            });
        });
    }

    set payment(value: TPayment) {
        this.paymentButtons.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === value);
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }
}
