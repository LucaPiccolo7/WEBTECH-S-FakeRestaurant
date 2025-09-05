import { AuthService } from "../services/AuthService.js";

export function optionalAuthentication(req, res, next){
    const authHeader = req.headers['authorization'];
    const authToken = authHeader?.split(' ')[1];
    if(authToken){
        AuthService.isTokenValid(authToken, (err, decodedToken) => {
            if(!err){
                req.username = decodedToken.username;
            }
        });
    }
    next();
}