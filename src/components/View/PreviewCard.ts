import { IPreviewCardData } from '../../types';
import { appEvents, categoryMap } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Card } from './Card';

const categoryClasses = Object.values(categoryMap);

export class PreviewCard extends Card<IPreviewCardData> {
    private readonly categoryElement: HTMLElement;
    private readonly imageElement: HTMLImageElement;
    private readonly descriptionElement: HTMLElement;
    private readonly actionButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected readonly events: IEvents) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.actionButton = ensureElement<HTMLButtonElement>('.card__button', container);
        this.actionButton.addEventListener('click', () => this.events.emit(appEvents.cardAction));
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set category(value: string) {
        this.categoryElement.textContent = value;
        this.categoryElement.classList.remove(...categoryClasses);
        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        this.categoryElement.classList.add(categoryClass);
    }

    set image(value: string) {
        this.setImage(this.imageElement, value, this.titleElement.textContent ?? '');
    }

    set buttonText(value: string) {
        this.actionButton.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.actionButton.disabled = value;
    }
}
