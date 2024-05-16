import express from 'express';
import userRoute from './user/index.js';
const route = express.Router();

route.get('/check', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the API',
    });
});

route.use('', userRoute);

export default route;