const express = require('express');
const { get } = require('http');
const path = require('path');

const indexRouter = require("./routes/indexRoute");

const app = express();


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});

app.use('/', indexRouter);

/*app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})
app.get('/section-2', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})*/

module.exports = app;