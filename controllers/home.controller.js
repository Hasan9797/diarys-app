const { diary } = require('../model/index');
// const getHomePage = function (req, res) {};

const getHomePage = async (req, res) => {
	try {
		const allDiary = await diary.findAll({
			where: { userId: req.session.user.id },
			raw: true,
			plain: false,
			include: ['users'],
			nest: true,
		});
		console.log(allDiary);
		res.render('diary/myDiary', {
			title: 'Home',
			allDiary: allDiary.reverse(),
			isAuthintecated: req.session.auth ? req.session.auth : false,
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getHomePage,
};
