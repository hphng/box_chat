const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/', controllers.getHomePage);
router.get('/adminInfo', controllers.getAdminInfoPage);
router.get('/user', controllers.getUserPage);
router.get('/userInfo', controllers.getUserInfoPage);
router.get('/adminChat', controllers.getAdminChatPage);

router.post('/userInfo', controllers.postUserInfo);
router.post('/adminInfo', controllers.postAdminInfo);
module.exports = router;