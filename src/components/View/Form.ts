import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IFormData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export abstract class Form<T extends IFormData> extends Component<T> {
    protected readonly submitButton: HTMLButtonElement;
    protected readonly errorsElement: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents, submitEvent: string) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

        container.addEventListener('input', (event) => {
            const input = event.target as HTMLInputElement;
            events.emit(appEvents.buyerChange, { field: input.name, value: input.value });
        });
        container.addEventListener('submit', (event) => {
            event.preventDefault();
            events.emit(submitEvent);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(value: string[]) {
        this.errorsElement.textContent = value.join('; ');
    }
}
