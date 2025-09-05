
import { AuthService } from "../services/AuthService.js";
import { AuthenticationTokenDoesNotExistsError } from '../errors/AuthenticationTokenDoesNotExistsError.js';
import { AuthenticationTokenNotValidError } from '../errors/AuthenticationTokenNotValidError.js'

export function enforceAuthentication(req, res, next){
  const authToken = extractToken(req.headers['authorization']);
  AuthService.isTokenValid(authToken, (err, decodedToken) => {
    if(err){
      throw new AuthenticationTokenNotValidError();
    } else {
      req.username = decodedToken.username;
      next();
    }
  });
}

export function extractToken(header){
  const token = header?.split(' ')[1];
  if(!token)
    throw new AuthenticationTokenDoesNotExistsError();
  else return token;
}
