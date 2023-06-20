import db from './db/connection.js';
import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import logger from 'morgan'
import cookieParser from 'cookie-parser';
import routes from './routes/auth.js'
import * as dotenv from 'dotenv'
dotenv.config();

const salePostRoutes = require('./routes/carSale');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(logger('development'));

app.use('/api', routes);

db.on('Connected', () => {
  console.clear(); // Add parentheses to clear the console
  console.log(chalk.blue('Connected to MongoDB'));
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
