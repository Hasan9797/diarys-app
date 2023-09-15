const { users } = require('../model/index');
const { diary } = require('../model/index');
const getUser = async (req, res) => {
	try {
		// const myDiary = await diary.findAll({
		// 	raw: true,
		// 	where: { userId: req.session.user.id },
		// });

		const data = await users.findByPk(req.session.user.id, {
			raw: false,
			plain: true,
			include: ['diary'],
			nest: true,
		});
		const user = data.toJSON();
		const newUser = {
			length: user.diary.length,
			...user,
		};
		res.render('auth/profile', {
			title: 'Profile',
			isAuthintecated: req.session.auth,
			newUser,
		});
	} catch (error) {
		console.log(error);
	}
};

const regester = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const user = await users.findOne({ raw: true, where: { email: email } });
		if (user) {
			return res.render('auth/registration', {
				title: 'Regester',
				error: 'User Authentication',
			});
		}
		const addUsers = await users.create({
			fullName: fullName,
			email: email,
			password: password,
		});
		const newUser = await addUsers.save();
		res.redirect('/auth/login');
	} catch (error) {
		console.log(error.message);
	}
};
const loginPage = async (req, res) => {
	try {
		res.render('auth/login', { title: 'Login' });
	} catch (error) {
		console.log(error.message);
	}
};
const regesterPage = async (req, res) => {
	try {
		res.render('auth/registration', { title: 'Login' });
	} catch (error) {
		console.log(error.message);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await users.findOne({ raw: true, where: { email: email } });
		const emailRegexp =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		const cheackEmail = emailRegexp.test(email);
		if (!user || !cheackEmail) {
			return res.render('auth/login', {
				title: 'Login',
				message: 'User is not defined or email is valid',
			});
		}
		if (user.password !== password) {
			return res.render('auth/login', {
				title: 'Login',
				message: 'Authorization filed',
			});
		}
		req.session.auth = true;
		req.session.user = user;
		res.redirect('/home');
	} catch (error) {
		console.log(error);
	}
};
const getByUpdate = async (req, res) => {
	const user = await users.findByPk(req.session.user.id, {
		raw: true,
	});
	res.render('auth/profile-update', {
		title: 'Update Profile',
		user,
		isAuthintecated: req.session.auth ? req.session.auth : false,
	});
};

const logOut = async (req, res) => {
	try {
		await req.session.destroy();
		res.redirect('/auth/login');
	} catch (error) {
		console.log(error);
	}
};
const updateUser = async (req, res) => {
	const update = await users.update(req.body, {
		where: {
			id: req.session.user.id,
		},
	});
	res.redirect('/profile/user');
};
const deleteUser = async (req, res) => {};

module.exports = {
	getUser,
	getByUpdate,
	regester,
	loginPage,
	regesterPage,
	login,
	logOut,
	updateUser,
	deleteUser,
};
