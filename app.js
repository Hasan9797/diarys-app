const express = require('express');
const app = express();
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const pgConnect = require('connect-pg-simple')(session);
const pool = require('./config/connect');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Buffer buni Object o'girarkanman
app.use(express.static(path.join(__dirname, './public')));

app.use(
	session({
		store: new pgConnect({ pool: pool, tableName: 'users_session' }),
		secret: 'myKey',
		resave: false,
		saveUninitialized: true,
	})
);
const { sequelize } = require('./model/index');
//Routers

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const diaryRouter = require('./routes/diary');
const commintRouter = require('./routes/commint');
const authRouter = require('./routes/auth');

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', homeRouter);
app.use('/profile', userRouter);
app.use('/diary', diaryRouter);
app.use('/commint', commintRouter);
app.use('/auth', authRouter);

async function start() {
	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`));
}
start();
