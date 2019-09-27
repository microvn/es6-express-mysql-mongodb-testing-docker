'use strict';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';

module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {exclude: ['password', 'deletedAt']},
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
        hooks: {
            beforeCreate: async (instance, options) => {
                instance.dataValues.password = await bcrypt.hash(instance.dataValues.password, bcrypt.genSaltSync(8));
            },
            beforeUpdate: async ({attributes, where}) => {
                console.log('beforeUpdate');
            },
            beforeBulkUpdate: async ({attributes, where}) => {
                if (attributes && attributes.password) attributes.password = await bcrypt.hash(attributes.password, bcrypt.genSaltSync(8));
            },
            beforeBulkCreate: async (instance, options) => {
                for (const user of instance) {
                    user.dataValues.password = await bcrypt.hash(user.dataValues.password, bcrypt.genSaltSync(8));
                }
            },
        },
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            },
        },
    });


    // Users.associate = models => {
    //     Users.hasMany(models.UserMeta, {foreignKey: 'userId'});
    // };

    return Users;

};
