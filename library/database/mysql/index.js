'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../../../config';

const db = {};

const sequelize = new Sequelize(configs.mysql.database, configs.mysql.username, configs.mysql.password, {
    host: configs.mysql.host,
    port: configs.mysql.port,
    dialect: 'mysql',
    dialectOptions: {
        supportBigNumbers: true,
        bigNumberStrings: true,
    },
    define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8mb4_unicode_ci',
        },
        timestamps: true,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000,
    },
    logging: configs.env === 'development' ? console.log : false,
    operatorsAliases: Sequelize.Op,
});

sequelize.authenticate().then(function (err) {
    console.log('Connection Successfully To Mysql Database.');
}).catch(function (err) {
    console.log(`Unable to connect to the database: ${err}`);
});

const basename = path.basename(__filename);

fs.readdirSync(`${__dirname}/models`).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    let model = sequelize['import'](path.join(`${__dirname}/models`, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
