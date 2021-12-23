const express = require('express');
const controllers = require('./../controllers/controllers');
const authcontroller = require('./../controllers/authcontroller');

const router = express.Router();

router.route('/Signup').post(controllers.signup);
router.route('/Login').post(controllers.login);
router.route('/getdata').get(authcontroller.protect, controllers.getdata);
module.exports = router;
