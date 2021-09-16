const express = require('express');

const router = express.Router();

//middlewares
const {authenticationCheck,isAdmin} = require('../middlewares/authentication');

//controllers
const {createOrUpdateUser,currentUser} = require('../controllers/authentication');

router.post('/create-or-update-user',authenticationCheck,createOrUpdateUser);
router.post('/current-user',authenticationCheck,currentUser);
router.post('/current-admin',authenticationCheck,isAdmin,currentUser);

module.exports = router;