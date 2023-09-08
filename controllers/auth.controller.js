const { users } = require('../model/index');
const getUser = async (req, res) => {
	try {
		const user = await users.findByPk(req.session.user.id, { raw: true });
		res.render('auth/profile', {
			title: 'Profile',
			isAuthintecated: req.session.auth,
			user,
		});
	} catch (error) {
		console.log(error);
	}
};
const regester = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
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
		console.log(email);
		const user = await users.findOne({ raw: true, where: { email: email } });
		console.log(user);
		if (!user) {
			return res.render('auth/login', {
				title: 'Login',
				message: 'User is not defined',
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
const getByUpdate = async (req, res) => {};

const logOut = async (req, res) => {
	try {
		await req.session.destroy();
		res.redirect('/auth/login');
	} catch (error) {
		console.log(error);
	}
};
const updateUser = async (req, res) => {};
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
