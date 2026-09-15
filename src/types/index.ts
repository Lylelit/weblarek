export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface ICardData {
    title: string;
    category: string;
    image: string;
    price: number | null;
}

export interface IPreviewCardData extends ICardData {
    description: string;
    buttonText: string;
    buttonDisabled: boolean;
}

export interface IBasketCardData {
    index: number;
    title: string;
    price: number | null;
}

export interface IPageData {
    catalog: HTMLElement[];
    counter: number;
}

export interface IBasketData {
    items: HTMLElement[];
    total: number;
    valid: boolean;
}

export interface IFormData {
    valid: boolean;
    errors: string[];
}

export interface IOrderFormData extends IFormData {
    payment: TPayment;
    address: string;
}

export interface IContactsFormData extends IFormData {
    email: string;
    phone: string;
}

export interface ISuccessData {
    total: number;
}

export interface IModalData {
    content: HTMLElement;
}

export interface IProductEvent {
    id: string;
}

export interface IBuyerChangeEvent {
    field: keyof IBuyer;
    value: string;
}
