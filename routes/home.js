const { Router } = require('express');
const router = Router();
const { getHomePage } = require('../controllers/home.controller');
const { verfiyAuth } = require('../middleware/verfiy');

router.get('/', (req, res) => {
	res.redirect('/home');
});

router.get('/home', verfiyAuth, getHomePage);

module.exports = router;
