const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router  = express.Router();

//REGISTER || METHOD POST
router.post('/register',registerController);
router.post('/login',loginController );

module.exports = router;