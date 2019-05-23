import * as express from 'express';
import * as cors from 'cors';
import {products} from './routes';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

products(app);

export {app};
