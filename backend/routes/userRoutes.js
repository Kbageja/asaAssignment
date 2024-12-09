var express = require('express');
var router = express.Router();
const {login,userRegister, getmyprofile, postUserWeather, getUserWeather}  = require("../controllers/user.js");
const { isAuthenticated } = require('../middlewares/auth.js');

/* GET users listing. */
router.post("/userWeather",postUserWeather);
router.post('/userlogin',login);
router.post('/userRegister',userRegister);
router.get("/me",isAuthenticated,getmyprofile);
router.get("/Weathers",getUserWeather);
module.exports = router;
