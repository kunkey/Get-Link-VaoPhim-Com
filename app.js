require('dotenv').config();
const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan("dev")); // sử dụng để log mọi request ra console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const APIController = require("./router/api/ApiController");

app.use("/api", APIController);

app.listen(process.env.PORT, console.log(`Server started at port ${process.env.PORT}`));