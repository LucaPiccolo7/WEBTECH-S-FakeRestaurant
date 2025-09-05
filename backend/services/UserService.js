import { User } from "../models/Database.js";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError.js";
import { UserDoesntExistsError } from "../errors/UserDoesntExistsError.js";

export class UserService {
    
    static async createUser(req){
        return await User.create(
        {
            username: req.validatedData.username,
            password: req.validatedData.password,
        },
        {
            fields: ['username', 'password'],
        });
    }

    static async checkUserDoesntExists(username){
        if(await this.getUserByUsername(username))
            throw new UserAlreadyExistsError(username);
    }

    static async checkUserAlreadyExists(username){
        const user = await this.getUserByUsername(username)
        if(!user)
            throw new UserDoesntExistsError(username);
        else
            return user;
    }

    static async getUserByUsername(username){
        return await User.findByPk(username);
    }
}