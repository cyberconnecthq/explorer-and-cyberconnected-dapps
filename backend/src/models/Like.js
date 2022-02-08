/**
 * 
 */

const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('Like', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        tweetId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}