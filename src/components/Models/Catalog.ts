import { IProduct } from '../../types';
import { appEvents } from '../../utils/constants';
import { IEvents } from '../base/Events';

export class Catalog {
    private products: IProduct[] = [];
    private preview: IProduct | null = null;

    constructor(private readonly events: IEvents) {}

    setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit(appEvents.catalogChanged);
    }

    getProducts(): IProduct[] {
        return this.products;
    }

    getProduct(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    setPreview(product: IProduct): void {
        this.preview = product;
        this.events.emit(appEvents.previewChanged);
    }

    getPreview(): IProduct | null {
        return this.preview;
    }
}
