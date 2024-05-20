import app from './src/app.js';
import 'dotenv/config';
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server start with port: ${port}`);
});
