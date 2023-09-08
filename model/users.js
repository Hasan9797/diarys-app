module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			fullName: {
				type: DataTypes.STRING(300),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(800),
				allowNull: false,
			},
		},
		{ timestamp: true }
	);
	return Users;
};
