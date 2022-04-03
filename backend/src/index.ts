import express from "express";
import cors from "cors";
import compression from "compression";
import dotenvSafe from 'dotenv-safe';
import environment from './environment';

dotenvSafe.config();

const app = express();

app.use(cors());
app.use(compression());

app.get('/', (req, res) => res.send({ status: 'Ok!' }));

app.listen(environment.port, () => {
  console.log(`Server started on port ${environment.port}`);
});
