const express = require('express');
const { get } = require('http');
const path = require('path');
const methodOverride = require('method-override');

const mainRouter = require("./routes/mainRoute");
const productsRouter = require('./routes/productsRoute')
const userRouter = require('./routes/userRoute')
const apiUsersRouter = require( './routes/api/users');
const apiProductsRouter = require( './routes/api/Products');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const cookies = require ('cookie-parser');

const app = express();


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/', mainRouter);

app.use(cookies());
//app.use(userLoggedMiddleware);

app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);


app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

/*app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})
app.get('/section-2', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})*/

module.exports = app;