import { IBuyer, TBuyerErrors, TPayment } from '../../types';
import { appEvents } from '../../utils/constants';
import { IEvents } from '../base/Events';

export class Buyer {
    private payment: TPayment = '';
    private email = '';
    private phone = '';
    private address = '';

    constructor(private readonly events: IEvents) {}

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }

        if (data.email !== undefined) {
            this.email = data.email;
        }

        if (data.phone !== undefined) {
            this.phone = data.phone;
        }

        if (data.address !== undefined) {
            this.address = data.address;
        }

        this.events.emit(appEvents.buyerChanged);
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit(appEvents.buyerChanged);
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }

        if (!this.email.trim()) {
            errors.email = 'Укажите email';
        }

        if (!this.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.address.trim()) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }
}
