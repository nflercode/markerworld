import { verifyAuthToken } from '../jwt/tokenHandler.js';

function jwtAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let result;

        try {
            result = verifyAuthToken(token);
        } catch(error) {
            return res.send(403);
        }

        req.auth = result;
        next();
    } else {
        res.sendStatus(401);
    }
}

export { jwtAuth }