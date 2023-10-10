import db from "./db/connection.js";
import authRoutes from './routes/auth.js';
import salePostRoutes from './routes/carSale.js';
import carInfoRoutes from './routes/carInfo.js';
import uploadRoutes from './routes/upload.js';

import path from "path";
import express from "express";
import cors from "cors";
import logger from "morgan";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());


app.use(logger("dev"));
app.use('/uploads', express.static(path.join('uploads')));

app.use('/auth', authRoutes);
app.use('/api', salePostRoutes);
app.use('/api', carInfoRoutes);
app.use('/api/upload', uploadRoutes);

db.on("connected", () => {
  console.log(chalk.blue("Connectd to MongoDB!"));
  app.listen(PORT, () => {
    process.env.NODE_ENV === "production"
      ? console.log(`Express server running in production on port ${PORT}\n\n`)
      : console.log(
          `Express server running in development on: http://localhost:${PORT}`
        );
  });
});