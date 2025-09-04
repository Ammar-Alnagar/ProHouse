const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();

// config: load env from server/.env -> server/config/config.env -> server/config/config.env.example
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    const resolved = [
        require('path').resolve(__dirname, '.env'),
        require('path').resolve(__dirname, './config/config.env'),
        require('path').resolve(__dirname, './config/config.env.example'),
    ];
    for (const p of resolved) {
        try {
            dotenv.config({ path: p });
            if (process.env.JWT_SECRET) break; // assume loaded
        } catch (_) {}
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    // Serve React build from root /build when deployed via CRA
    app.use(express.static(path.join(__dirname, '..', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
const errorMiddleware = require('./middlewares/error');
app.use(errorMiddleware);

module.exports = app;











































































































