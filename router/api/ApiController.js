const express = require('express')
const router = express.Router();

const vaophimRouter = require('./site/vaophim');


// Router HTTP
router.use("/vaophim", vaophimRouter);


module.exports = router;