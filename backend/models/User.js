import { DataTypes } from 'sequelize';

export function createModel(database){
    database.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            password: { //password salvata utilizzando hashing e salting di bcrypt
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            
        }
    );
}