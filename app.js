const express = require('express');
const { get } = require('http');
const path = require('path');

const mainRouter = require("./routes/mainRoute");
const productsRouter = require('./routes/productsRoute')
const userRouter = require('./routes/userRoute')

const app = express();


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

app.set('view engine', 'ejs');
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);


/*app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})
app.get('/section-2', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})*/

module.exports = app;