const { diary } = require('../model/index');
const { Op } = require('sequelize');
const getById = async (req, res) => {
	try {
		const data = await diary.findByPk(req.params.id, {
			raw: false,
			plain: true,
			include: ['commints', 'users'],
			nest: true,
		});
		// const data = await oneDiary.toJSON();
		const oneDiary = await data.toJSON();
		const newData = {commints: oneDiary.commints.reverse(), ...oneDiary}
		console.log(newData);
		res.render('diary/diary', {
			title: 'Diary',
			newData,
			isAuthintecated: req.session.auth ? req.session.auth : false,
		}); // { text: 'Oookey', img: 'sdsdsdsdsdsds}
	} catch (error) {
		console.log(error);
	}
};
const getByUpdate = async (req, res) => {
	try {
		const { id } = req.params.id;
	} catch (error) {
		console.log(error);
	}
};
const addDiary = async (req, res) => {
	try {
		const { img, text } = req.body;
		const newDiary = await diary.create({
			img: img,
			text: text,
			userId: req.session.user.id,
		});
		res.redirect('/home');
	} catch (error) {
		console.log(error);
	}
};
const updateDairy = async (req, res) => {};

const diaryLenta = async (req, res) => {
	try {
		const allDiary = await diary.findAll({
			raw: true,
			plain: false,
			where: { userId: { [Op.ne]: req.session.user.id } },
			include: ['users'],
			nest: true,
		});
		res.render('diary/lenta', {
			title: 'Lenta',
			allDiary,
			isAuthintecated: req.session.auth ? req.session.auth : false,
		});
	} catch (error) {
		console.log(error);
	}
};
const deleteDairy = async (req, res) => {};

module.exports = {
	getById,
	getByUpdate,
	addDiary,
	updateDairy,
	deleteDairy,
	diaryLenta,
};
