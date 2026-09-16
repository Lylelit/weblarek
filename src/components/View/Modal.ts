import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IModalData } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<IModalData> {
    private readonly contentElement: HTMLElement;
    private readonly closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected readonly events: IEvents) {
        super(container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

        this.closeButton.addEventListener('click', () => this.events.emit(appEvents.modalClose));
        container.addEventListener('mousedown', (event) => {
            if (event.target === container) {
                this.events.emit(appEvents.modalClose);
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.contentElement.replaceChildren();
    }

    render(data: Partial<IModalData>): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
