module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        userName: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        fullName: DataTypes.STRING,
        role: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return users;
}