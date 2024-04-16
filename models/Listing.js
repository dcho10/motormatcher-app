const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Listing extends Model {}

Listing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestampes: false,
        freezeTableName: true,
        underscored: true,
        modelName: "listing",
    }
);

module.exports = Listing;