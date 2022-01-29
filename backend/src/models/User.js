const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
			defaultValue: () => "NewUser",
        },
        nonce: {
			type: DataTypes.INTEGER, // SQLITE will use INTEGER
            allowNull: false,
			defaultValue: () => Math.floor(Math.random() * 10000), // Initialize with a random nonce
        },
        publicAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        avatar: {
            type: DataTypes.STRING,
            //defaultValue: 'https://res.cloudinary.com/twitter-clone-media/image/upload/v1597737557/user_wt3nrc.png'
            defaultValue: '/public/images/avatar/strict-beauty.png'
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    });
};