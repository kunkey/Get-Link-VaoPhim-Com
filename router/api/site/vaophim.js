const express = require('express')
const router = express.Router();
const vaophimModule = require('../module/vaophim');

router.get("/", async (req, res) => {
    if(req.query.url == '' || !req.query.url || req.query.url == null) {
        res.json({
            status: false,
            msg: 'Error: Empty Url!'
        });
    }else {
        const checkUrl = vaophimModule.checkUrlValidate(req.query.url);
        if(checkUrl) {
            
            const movieID = await vaophimModule.getPlayer(req.query.url);

            res.json(movieID);
            
        }else {
            res.json({
                status: false,
                msg: 'Error: Url Isn\'t Availible!'
            });   
        }


    }
});



module.exports = router;