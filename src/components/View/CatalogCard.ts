import { ICardData } from '../../types';
import { categoryMap } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { Card } from './Card';

const categoryClasses = Object.values(categoryMap);

export class CatalogCard extends Card<ICardData> {
    private readonly categoryElement: HTMLElement;
    private readonly imageElement: HTMLImageElement;

    constructor(container: HTMLElement, onClick: () => void) {
        super(container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
        container.addEventListener('click', onClick);
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
}
