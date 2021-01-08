module.exports = (sequelize, DataTypes) => {
    const donator = sequelize.define('donator', {
        userId: DataTypes.STRING,
        typeOfNeed: DataTypes.STRING,
        receiverId: DataTypes.STRING
    });

    return donator;
}