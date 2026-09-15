import { IProduct } from '../../types';
import { appEvents } from '../../utils/constants';
import { IEvents } from '../base/Events';

export class Basket {
    private items: IProduct[] = [];

    constructor(private readonly events: IEvents) {}

    getItems(): IProduct[] {
        return this.items;
    }

    addItem(product: IProduct): void {
        this.items.push(product);
        this.events.emit(appEvents.basketChanged);
    }

    removeItem(product: IProduct): void {
        this.items = this.items.filter((item) => item.id !== product.id);
        this.events.emit(appEvents.basketChanged);
    }

    clear(): void {
        this.items = [];
        this.events.emit(appEvents.basketChanged);
    }

    getTotal(): number {
        return this.items.reduce((total, product) => total + (product.price ?? 0), 0);
    }

    getCount(): number {
        return this.items.length;
    }

    hasItem(id: string): boolean {
        return this.items.some((product) => product.id === id);
    }
}
