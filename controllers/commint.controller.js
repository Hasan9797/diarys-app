const { commints } = require('../model/index');

const getById = async (req, res) => {
	try {
		const oneDiary = await commints.findByPk(req.params.id, { raw: true });
		res.render('diary/diary', {
			title: 'Diary',
			oneDiary,
			isAuthintecated: req.session.auth ? req.session.auth : false,
		});
	} catch (error) {
		console.log(error);
	}
};

const addCommint = async (req, res) => {
	try {
		const { id, commint } = req.body;
		const newDiary = await commints.create({
			commint: commint,
			diaryId: id,
			userName: req.session.user.fullName,
			userId: req.session.user.id,
		});
		// await newDiary.save();
		res.redirect(`/diary/by/${id}`);
	} catch (error) {
		console.log(error);
	}
};

const updateDairy = async (req, res) => {};
const deleteDairy = async (req, res) => {};

module.exports = {
	getById,
	addCommint,
	updateDairy,
	deleteDairy,
};
