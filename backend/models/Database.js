import { Sequelize } from "sequelize"
import { createModel as createUserModel } from "./User.js";
import { createModel as createRestaurantModel } from "./Restaurant.js";
import { createModel as createReviewModel } from "./Review.js";
import { createModel as createVoteModel } from './Vote.js';

import 'dotenv/config.js';

export const database = new Sequelize(
    process.env.DB_CONNECTION_URI, {
        dialect: process.env.DIALECT
    }
);

//creazione dei model
createUserModel(database);
createRestaurantModel(database);
createReviewModel(database);    
createVoteModel(database);

//creazione associazioni
export const {User, Restaurant, Review, Vote} = database.models;

//User-(1)-publishing-(0..*)-Restaurant
User.hasMany(Restaurant);
Restaurant.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    }
});

//User-(1)-adding-(0..*)-Review
User.hasMany(Review);
Review.belongsTo(User, {
    foreignKey: {
        allowNull: false,
    }
});

//Restaurant-(1)-owning-(0..*)-Review
Restaurant.hasMany(Review, {
    foreignKey: {
        onDelete: 'CASCADE',
        allowNull: false,
    }
});
Review.belongsTo(Restaurant);

//Reviews-(1)-contains-(0..*)-Votes
Review.hasMany(Vote, {
    foreignKey: {
        onDelete: 'CASCADE',
        allowNull: false,
    }
});
Vote.belongsTo(Review);

//sincronizza più Model contemporaneamente nella modalità di default
//alter force
database.sync().then( () => {
    console.log("All tabels synchronized.");
}).catch( err => {
    console.log("Failed synchronization:", err.message);
});