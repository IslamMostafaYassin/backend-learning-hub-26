import express from 'express';
import microbusRouter from './routes/microbusRouter';
import logger from './middleware/loggerMiddleware';

const app = express();

app.use(express.json());
app.use(logger); 

app.use('/fleet', microbusRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Am Ashraf's garage is open and listening on port ${PORT} 🚕`);
});
