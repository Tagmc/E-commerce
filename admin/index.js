const express = require('express');
require('dotenv').config();
const connect = require("./config/connect");
const app = express();
const initRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//["https://ecommerce-nqh.vercel.app"]
app.use(cors({
  origin: process.env.CLIENT_URL,
  method: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}))

const port = process.env.PORT || 8888;
app.use(express.json()); // express co the doc data client dua len
app.use(express.urlencoded({extended: true})); // doc data gui theo array, object
app.use(cookieParser());
connect();

//Routes admin
initRoutes(app);

app.listen(port, () => {
  console.log('Server running on the port:', port);
});
