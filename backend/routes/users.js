const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.index);
router.delete('/:id',UsersController.deleteUser)

module.exports = router;