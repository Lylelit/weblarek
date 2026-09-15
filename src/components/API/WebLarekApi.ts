import {
    IApi,
    IOrder,
    IOrderResponse,
    IProductsResponse,
} from '../../types';

const productEndpoint = '/product/';
const orderEndpoint = '/order/';

export class WebLarekApi {
    constructor(private api: IApi) {}

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>(productEndpoint);
    }

    createOrder(order: IOrder): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>(orderEndpoint, order);
    }
}
