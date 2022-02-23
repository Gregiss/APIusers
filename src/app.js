import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { routes } from './routes.js';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Enable router logger on development
!isProduction && app.use(logger('dev'));

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parser
app.use(routes); // Use routes

// Export app
export { app };