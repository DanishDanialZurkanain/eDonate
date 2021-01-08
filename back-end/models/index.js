const Fs = require("fs");
const Path = require("path");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'eDonate',
    'danial-edonate',
    'el3ph@nt',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

const db = {};

Fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const model = require('./' + file)(sequelize, Sequelize.DataTypes)
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db