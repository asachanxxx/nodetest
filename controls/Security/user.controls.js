var express = require('express');
var router = express.Router();

// Get All Users
router.get('/GetAllUsers', (req, res) => {
    res.send([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

router.get('/GetAllUsers/:id', (req,res)=>{
    res.send([1]);
});

module.exports = router;