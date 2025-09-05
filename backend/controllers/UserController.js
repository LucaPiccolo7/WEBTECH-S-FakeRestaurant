import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError.js";

export class UserController {

    static async createNewUser(req, res, next){
        UserService.createUser(req)
        .then((user) => {
            res.status(201);
            res.json(user);
        })
        .catch((error) => {
            next(error);
        });
    }

    static async checkUserCredentials(req, res, next){
        const rawPassword = req.validatedData.password;
        const actualPassword = (await UserService.getUserByUsername(req.validatedData.username)).password;
        AuthService.checkPassword(rawPassword, actualPassword)
        .then((matched) => {
            if(matched){
                const authToken = AuthService.issueToken(req.validatedData.username)
                res.status(200);
                res.json(authToken);
            } else {
                next(new InvalidCredentialsError(req.validatedData.username));
            }
        })
        .catch((error) => {
            next(error);
        });
    }

    static async checkUserAlreadyExists(req, res, next){
        UserService.checkUserAlreadyExists(req.validatedData.username)
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
    }

    static async checkUserDoesntExists(req, res, next){
        UserService.checkUserDoesntExists(req.validatedData.username)
        .then((() => {
            next();
        }))
        .catch((error) => {
            next(error);
        })
    }

    static async generateHashedPassword(req, res, next){
        AuthService.createHashedPassword(req.validatedData.password)
        .then((hashedPassword) => {
            req.validatedData.password = hashedPassword;
            next();
        })
        .catch((error) => {
            next(error);
        });
    }

    /*
    static async getUserByUsername(username){
        return await UserService.getUserByUsername(username);
    }

    static async checkUserAlreadyExists(username){
        return await UserService.checkUserAlreadyExists(username);
    }

    static async checkNoSuchUserExists(username){
       await UserService.checkNoSuchUserExists(username);
    }

    static async generateHashedPassword(rawPassword){
        return await AuthService.createHashedPassword(rawPassword);
    }
    */
}