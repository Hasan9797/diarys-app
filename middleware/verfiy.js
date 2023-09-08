const verfiyAuth = async (req, res, next) => {
	if (!req.session.auth) {
		return res.redirect('/auth/login');
	}
	req.user = req.session.user;
	next();
};

module.exports = {
	verfiyAuth,
};
