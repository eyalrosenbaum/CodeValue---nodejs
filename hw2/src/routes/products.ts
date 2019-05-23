import {Application} from 'express';
import {controllers} from '../controllers';

function setup(app: Application) {
  app.get('/products', controllers.getProducts);
  app.get('/products/:id', controllers.getProduct);
  app.post('/products', controllers.addProduct);
  app.put('/products/:id', controllers.updateProduct);
  app.delete('/products/:id', controllers.deleteProduct);
}

export default setup;
