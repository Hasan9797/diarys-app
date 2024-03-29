const { Router } = require('express');
const router = Router();
const {
	getUser,
	getByUpdate,
	regester,
	loginPage,
	regesterPage,
	login,
	updateUser,
	deleteUser,
	logOut,
} = require('../controllers/auth.controller');

router.get('/', getUser);
router.get('/login', loginPage);
router.get('/logout', logOut);
router.get('/regester', regesterPage);
router.post('/regester', regester);
router.post('/login', login);
router.get('/get/update', getByUpdate);
router.post('/update', updateUser);
// router.delete('/delete', deleteDairy);

module.exports = router;
