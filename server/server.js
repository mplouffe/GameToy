// const path = require('path');
// const http = require('http');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('../webpack.config.js');
const compiler = webpack(config);

// const publicPath = path.join(__dirname, '../dist');
const port = process.env.PORT || 3000;

const app = express();
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

// const server = http.createServer(app);

// app.use(express.static(publicPath));

app.listen(port, (err) => {
    console.log(`GameToy is up on localhost:${port}`);
});