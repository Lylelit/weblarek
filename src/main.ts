import './scss/styles.scss';

import { WebLarekApi } from './components/API/WebLarekApi';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { BasketCard } from './components/View/BasketCard';
import { BasketView } from './components/View/BasketView';
import { CatalogCard } from './components/View/CatalogCard';
import { ContactsForm } from './components/View/ContactsForm';
import { Gallery } from './components/View/Gallery';
import { Header } from './components/View/Header';
import { Modal } from './components/View/Modal';
import { OrderForm } from './components/View/OrderForm';
import { PreviewCard } from './components/View/PreviewCard';
import { Success } from './components/View/Success';
import { IBuyerChangeEvent, IProductEvent, TPayment } from './types';
import {
    API_URL,
    CDN_URL,
    appEvents,
} from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const catalog = new Catalog(events);
const basket = new Basket(events);
const buyer = new Buyer(events);
const baseApi = new Api(API_URL);
const api = new WebLarekApi(baseApi);

const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new BasketView(cloneTemplate<HTMLElement>('#basket'), events);
const preview = new PreviewCard(cloneTemplate<HTMLElement>('#card-preview'), events);
const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>('#order'), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>('#contacts'), events);
const success = new Success(cloneTemplate<HTMLElement>('#success'), events);

const renderCatalog = (): void => {
    const cards = catalog.getProducts().map((product) => {
        const card = new CatalogCard(
            cloneTemplate<HTMLElement>('#card-catalog'),
            () => events.emit(appEvents.catalogSelect, { id: product.id })
        );
        return card.render({
            title: product.title,
            category: product.category,
            image: `${CDN_URL}${product.image}`,
            price: product.price,
        });
    });
    gallery.render({ items: cards });
};

const renderBasket = (): void => {
    const products = basket.getItems();
    const items = products.map((product, position) => {
        const card = new BasketCard(
            cloneTemplate<HTMLElement>('#card-basket'),
            () => events.emit(appEvents.basketRemove, { id: product.id })
        );
        return card.render({
            index: position + 1,
            title: product.title,
            price: product.price,
        });
    });
    basketView.render({
        items,
        total: basket.getTotal(),
        valid: products.length > 0,
    });
    header.render({ counter: basket.getCount() });
};

const checkOrder = (): string[] => {
    const errors = buyer.validate();
    return [errors.payment, errors.address].filter((error): error is string => Boolean(error));
};

const checkContacts = (): string[] => {
    const errors = buyer.validate();
    return [errors.email, errors.phone].filter((error): error is string => Boolean(error));
};

const renderOrder = (): void => {
    const data = buyer.getData();
    const errors = checkOrder();
    orderForm.render({
        payment: data.payment,
        address: data.address,
        errors,
        valid: errors.length === 0,
    });
};

const renderContacts = (): void => {
    const data = buyer.getData();
    const errors = checkContacts();
    contactsForm.render({
        email: data.email,
        phone: data.phone,
        errors,
        valid: errors.length === 0,
    });
};

events.on(appEvents.catalogChanged, () => {
    renderCatalog();
});

events.on(appEvents.previewChanged, () => {
    const product = catalog.getPreview();
    if (!product) return;

    const isUnavailable = product.price === null;
    let buttonText = 'Купить';
    if (isUnavailable) {
        buttonText = 'Недоступно';
    } else if (basket.hasItem(product.id)) {
        buttonText = 'Удалить из корзины';
    }

    modal.render({
        content: preview.render({
            title: product.title,
            category: product.category,
            image: `${CDN_URL}${product.image}`,
            description: product.description,
            price: product.price,
            buttonText,
            buttonDisabled: isUnavailable,
        }),
    });
});

events.on(appEvents.basketChanged, () => {
    renderBasket();
});

events.on(appEvents.buyerChanged, () => {
    renderOrder();
    renderContacts();
});

events.on<IProductEvent>(appEvents.catalogSelect, ({ id }) => {
    const product = catalog.getProduct(id);
    if (!product) return;

    catalog.setPreview(product);
});

events.on(appEvents.cardAction, () => {
    const product = catalog.getPreview();
    if (!product) return;

    if (basket.hasItem(product.id)) {
        basket.removeItem(product);
    } else {
        basket.addItem(product);
    }
    modal.close();
});

events.on(appEvents.basketOpen, () => {
    modal.render({ content: basketView.render() });
});

events.on<IProductEvent>(appEvents.basketRemove, ({ id }) => {
    const product = catalog.getProduct(id);
    if (!product) return;
    basket.removeItem(product);
});

events.on(appEvents.basketOrder, () => {
    modal.render({ content: orderForm.render() });
});

events.on<IBuyerChangeEvent>(appEvents.buyerChange, ({ field, value }) => {
    if (field === 'payment') {
        buyer.setData({ payment: value as TPayment });
    } else {
        buyer.setData({ [field]: value });
    }
});

events.on(appEvents.orderSubmit, () => {
    modal.render({ content: contactsForm.render() });
});

events.on(appEvents.contactsSubmit, () => {
    const total = basket.getTotal();
    const order = {
        ...buyer.getData(),
        total,
        items: basket.getItems().map((product) => product.id),
    };

    api.createOrder(order)
        .then((response) => {
            basket.clear();
            buyer.clear();
            modal.render({ content: success.render({ total: response.total }) });
        })
        .catch((error: unknown) => {
            console.error('Не удалось оформить заказ:', error);
        });
});

events.on(appEvents.modalClose, () => modal.close());
events.on(appEvents.successClose, () => modal.close());

basket.clear();
buyer.clear();

api.getProducts()
    .then((response) => {
        catalog.setProducts(response.items);
    })
    .catch((error: unknown) => {
        console.error('Не удалось загрузить каталог:', error);
    });
