const { Router } = require('express');
const router = Router();
const {
	getUser,
	getByUpdate,
	updateUser,
	regester,
	login,
	deleteUser,
} = require('../controllers/auth.controller');

router.get('/user', getUser);
router.get('/by/udate/:id', getByUpdate);
router.post('/regester', regester);
router.post('/login', login);
router.post('/user/update', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
