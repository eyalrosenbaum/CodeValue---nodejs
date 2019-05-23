import {Product} from '../models';
import * as products from './products.json';

interface Store {
  products: Product[];
}

const store: Store = {
  products,
};

export {store};
