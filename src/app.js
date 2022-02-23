import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { routes } from './routes.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Enable router logger on development
!isProduction && app.use(logger('dev'));

app.use(cors()); 
app.use(express.json()); 
app.use(routes); 


export { app };