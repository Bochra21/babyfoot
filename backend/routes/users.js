const express = require('express');
const router = express.Router();
const { createUser, getUserId } = require('../controllers/userController');

router.post('/', createUser);
router.post('/get-id', getUserId);
module.exports = router;
