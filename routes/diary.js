const { Router } = require('express');
const router = Router();
const {
	getById,
	getByUpdate,
	addDiary,
	updateDairy,
	diaryLenta,
	deleteDairy,
} = require('../controllers/diary.controller');
const { verfiyAuth } = require('../middleware/verfiy');
router.get('/by/:id', verfiyAuth, getById);
router.get('/update/:id', verfiyAuth, getByUpdate);
router.post('/add', verfiyAuth, addDiary);
router.post('/update', verfiyAuth, updateDairy);
router.get('/lenta', verfiyAuth, diaryLenta);
router.get('/delete/:id', verfiyAuth, deleteDairy);

module.exports = router;
