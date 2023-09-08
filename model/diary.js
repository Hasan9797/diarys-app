module.exports = (sequelize, DataTypes) => {
	const diary = sequelize.define(
		'diarys',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			img: {
				type: DataTypes.STRING(250),
				allowNull: false,
			},
			text: {
				type: DataTypes.STRING(1000),
				allowNull: false,
			},
		},
		{ timestamp: true }
	);
	return diary;
};
