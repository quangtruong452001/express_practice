import express from 'express';
import route from './routes/index.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', route);

// middleware for handling error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  error.message = 'Invalid route';
  next(error);
});
// manage error function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      status: 'error',
      code: error.status || 500,
      message: error.message || 'Internal Server Error',
      stack: error.stack,
  });
});

export default app;