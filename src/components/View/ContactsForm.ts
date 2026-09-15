import { ensureElement } from '../../utils/utils';
import { appEvents } from '../../utils/constants';
import { IContactsFormData } from '../../types';
import { IEvents } from '../base/Events';
import { Form } from './Form';

export class ContactsForm extends Form<IContactsFormData> {
    private readonly emailInput: HTMLInputElement;
    private readonly phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events, appEvents.contactsSubmit);
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', container);
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }
}
