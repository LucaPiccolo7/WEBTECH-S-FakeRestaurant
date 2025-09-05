import { DataTypes } from "sequelize";

export function createModel(database){
    database.define(
        'Restaurant',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            latitude: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            }
        },
        {

        }
    );
}