const { Sequelize, DataTypes } = require('sequelize');
const { user, server, password, database, port } = require('../config/db');

const sequelize = new Sequelize(database, user, password, {
	host: server,
	port: port,
	dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.diary = require('./diary')(sequelize, DataTypes);
db.commints = require('./commint')(sequelize, DataTypes);
db.users = require('./users')(sequelize, DataTypes);

db.diary.hasMany(db.commints, {
	as: 'commints',
	oneDelete: 'CASCADE',
	constraints: true,
});

db.commints.belongsTo(db.diary, { foreignKey: 'diaryId', as: 'diary' });

db.users.hasMany(db.commints, {
	as: 'commints',
	oneDelete: 'CASCADE',
	constraints: true,
});
db.commints.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

db.users.hasMany(db.diary, {
	as: 'diary',
	oneDelete: 'CASCADE',
	constraints: true,
});
db.diary.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

module.exports = db;
