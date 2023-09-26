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
		const oneDiary = await data.toJSON();
		const newData = { commints: oneDiary.commints.reverse(), ...oneDiary };
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
		const mydiary = await diary.findByPk(req.params.id, { raw: true });
		console.log(mydiary);
		res.render('diary/edit', {
			title: 'Update Diary',
			mydiary,
			isAuthintecated: req.session.auth ? req.session.auth : false,
		});
	} catch (error) {
		console.log(error);
	}
};
const addDiary = async (req, res) => {
	try {
		const { text } = req.body;
		await diary.create({
			img: '/upload/' + req.file.filename, // ./piblic/upload/img-1694542948911-.png
			text: text,
			userId: req.session.user.id,
		});
		res.redirect('/home');
	} catch (error) {
		console.log(error);
	}
};
const updateDairy = async (req, res) => {
	try {
		await diary.update({ text: req.body.text }, { where: { id: req.body.id } });
		res.redirect('/home');
	} catch (error) {
		console.log(error);
	}
};

const diaryLenta = async (req, res) => {
	try {
		const allDiary = await diary.findAll({
			raw: true,
			plain: false,
			where: { userId: { [Op.ne]: req.session.user.id } },
			include: ['users'],
			nest: true,
		});
		allDiary.reverse();
		res.render('diary/lenta', {
			title: 'Lenta',
			allDiary,
			isAuthintecated: req.session.auth ? req.session.auth : false,
		});
	} catch (error) {
		console.log(error);
	}
};
const deleteDairy = async (req, res) => {
	try {
		await diary.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.redirect('/home');
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getById,
	getByUpdate,
	addDiary,
	updateDairy,
	deleteDairy,
	diaryLenta,
};
