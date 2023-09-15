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
const { upload } = require('../middleware/fileUpload');
router.get('/by/:id', verfiyAuth, getById);
router.get('/update/:id', verfiyAuth, getByUpdate);
router.post('/add', verfiyAuth, upload.single('img'), addDiary);
router.post('/update', verfiyAuth, updateDairy);
router.get('/lenta', verfiyAuth, diaryLenta);
router.get('/delete/:id', verfiyAuth, deleteDairy);

module.exports = router;
