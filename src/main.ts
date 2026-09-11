import './scss/styles.scss';

import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog';
import { WebLarekApi } from './components/API/WebLarekApi';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const catalog = new Catalog();

catalog.setProducts(apiProducts.items);
console.log('Каталог:', catalog.getProducts());

const product = catalog.getProduct(apiProducts.items[0].id);
console.log('Товар по id:', product);

if (product) {
    catalog.setPreview(product);
}

console.log(
    'Товар, выбранный для подробного отображения:',
    catalog.getPreview()
);

const basket = new Basket();

console.log('Пустая корзина:', basket.getItems());

basket.addItem(apiProducts.items[0]);
basket.addItem(apiProducts.items[1]);
console.log('Товары в корзине:', basket.getItems());
console.log('Количество товаров в корзине:', basket.getCount());
console.log('Стоимость товаров в корзине:', basket.getTotal());
console.log('Первый товар положен в корзине:',
    basket.hasItem(apiProducts.items[0].id)
);

basket.removeItem(apiProducts.items[0]);
console.log('Корзина после удаления товаров:', basket.getItems());
console.log(
    'Есть ли удалённый товар в корзине:',
    basket.hasItem(apiProducts.items[0].id)
);

basket.clear();
console.log('Товары после очистки корзины:', basket.getItems());
console.log('Количество товаров после очистки:', basket.getCount());
console.log('Стоимость товаров после очистки:', basket.getTotal());

const buyer = new Buyer();

console.log('Данные покупателя:', buyer.getData());
console.log('Ошибки в незаполненных данных покупателя:', buyer.validate());

buyer.setData({
    payment: 'card',
    address: 'адрес',
});
console.log('Частично заполненные данные покупателя:', buyer.getData());
console.log('Ошибки в частично заполненных данных:', buyer.validate());

buyer.setData({
    email: 'buyer@example.com',
    phone: '+7 999 123-45-67',
});
console.log('Все данные покупателя:', buyer.getData());
console.log('Ошибки в заполненных данных покупателя:', buyer.validate());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());

const api = new Api(API_URL);
const webLarekApi = new WebLarekApi(api);

webLarekApi
    .getProducts()
    .then((response) => {
        catalog.setProducts(response.items);
        console.log(
            'Каталог товаров, полученный с сервера:',
            catalog.getProducts()
        );
    })
    .catch((error) => {
        console.error('Ошибка при загрузке каталога:', error);
    });
