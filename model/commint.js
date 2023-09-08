module.exports = (sequelize, DataTypes) => {
	const commints = sequelize.define(
		'commints',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			userName: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			commint: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
		},
		{ timestamp: true }
	);
	return commints;
};
