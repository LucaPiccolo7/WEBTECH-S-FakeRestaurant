import { DataTypes } from "sequelize";

export function createModel(database){
    database.define(
        'Review',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            popularity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            upvotes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            downvotes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {

        }
    );
}
