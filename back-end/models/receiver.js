module.exports = (sequelize, DataTypes) => {
    const receiver = sequelize.define('receiver', {
        typeOfHelp: DataTypes.STRING,
        typeOfNeed: DataTypes.STRING,
        bloodType: DataTypes.STRING,
        userId: DataTypes.STRING,
        fullName: DataTypes.STRING,
        familyMember: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        emergency: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        status: DataTypes.STRING
    });

    return receiver;
}