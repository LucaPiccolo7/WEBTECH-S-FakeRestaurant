import Bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';

export class AuthService {

    static async createHashedPassword(rawPassword){
        const saltRounds = 10;
        return await Bcrypt.hash(rawPassword, saltRounds);
    }
    
    //ritorna true o false
    static async checkPassword(rawPassword, actualPassword){
        return await Bcrypt.compare(rawPassword, actualPassword);
    }

    static issueToken(username){
        return Jwt.sign({username: username}, process.env.SECRET_TOKEN, {expiresIn: `${6*60*60}s`}); //6 ore
    }

    static isTokenValid(token, callback){
        Jwt.verify(token, process.env.SECRET_TOKEN, callback);
    }
}