import {store} from '../store';
import {Request, Response} from 'express';
import {Product} from '../models';

export const RANGE = 10000;

export const getProducts = (req: Request, res: Response) => res.send(store.products);

export const getProduct = (req: Request, res: Response) => {
  const id = +req.params.id;
  const existing = findProductById(id);

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  if (!existing) {
    res.sendStatus(404);
    return;
  }

  res.send(existing);
};

export const addProduct = (req: Request, res: Response) => {
  const product = req.body as Product;
  if (product.name.length < 3) {
    res.sendStatus(409);
    return;
  }

  product.id = Math.floor(Math.random() * RANGE);
  while (findProductById(product.id)) {
    product.id = Math.floor(Math.random() * RANGE);
  }

  store.products.push(product);

  res.status(201).send(product);
  return;
};

export const updateProduct = (req: Request, res: Response) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  const existing = findProductById(id);

  if (!existing) {
    res.sendStatus(404);
    return;
  }

  const product = req.body as Product;

  if (product.name.length < 3) {
    res.sendStatus(409);
    return;
  }

  Object.assign(existing, product);
  res.send(existing);
};

export const deleteProduct = (req: Request, res: Response) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
    return;
  }

  const existingIndex = store.products.findIndex(p => p.id === id);

  if (existingIndex < 0) {
    res.sendStatus(404);
    return;
  }

  store.products.splice(existingIndex, 1);
  res.sendStatus(204);
};

function findProductById(id: number): Product | undefined {
  return store.products.find(p => p.id === id);
}
