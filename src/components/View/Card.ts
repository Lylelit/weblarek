import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBasketCardData, ICardData, IPreviewCardData } from '../../types';
import { appEvents, categoryMap } from '../../utils/constants';
import { ensureElement, formatPrice } from '../../utils/utils';

const categoryClasses = Object.values(categoryMap);

abstract class Card<T> extends Component<T> {
    protected readonly titleElement: HTMLElement;
    protected readonly priceElement: HTMLElement;
    protected readonly categoryElement: HTMLElement | null;
    protected readonly imageElement: HTMLImageElement | null;

    constructor(container: HTMLElement) {
        super(container);
        this.titleElement = ensureElement<HTMLElement>('.card__title', container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', container);
        this.categoryElement = container.querySelector<HTMLElement>('.card__category');
        this.imageElement = container.querySelector<HTMLImageElement>('.card__image');
    }

    set title(value: string) {
        this.titleElement.textContent = value;
    }

    set price(value: number | null) {
        this.priceElement.textContent = formatPrice(value);
    }

    set category(value: string) {
        if (!this.categoryElement) return;
        this.categoryElement.textContent = value;
        this.categoryElement.classList.remove(...categoryClasses);
        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        if (categoryClass) {
            this.categoryElement.classList.add(categoryClass);
        }
    }

    set image(value: string) {
        if (this.imageElement) {
            this.setImage(this.imageElement, value, this.titleElement.textContent ?? '');
        }
    }
}

export class CatalogCard extends Card<ICardData> {
    constructor(container: HTMLElement, events: IEvents, id: string) {
        super(container);
        container.addEventListener('click', () => events.emit(appEvents.catalogSelect, { id }));
    }
}

export class PreviewCard extends Card<IPreviewCardData> {
    private readonly descriptionElement: HTMLElement;
    private readonly actionButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
        this.actionButton = ensureElement<HTMLButtonElement>('.card__button', container);
        this.actionButton.addEventListener('click', () => events.emit(appEvents.previewToggle));
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.actionButton.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.actionButton.disabled = value;
    }
}

export class BasketCard extends Card<IBasketCardData> {
    private readonly indexElement: HTMLElement;
    private readonly deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents, id: string) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
        this.deleteButton.addEventListener('click', () => events.emit(appEvents.basketRemove, { id }));
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}
