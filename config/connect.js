const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	server: 'localhost',
	password: 'pg97',
	database: 'blogs',
	port: 5432,
});

module.exports = pool;
