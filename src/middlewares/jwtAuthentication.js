import { verifyAuthToken } from '../jwt/tokenHandler.js';

function jwtAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const result = verifyAuthToken(token);
        if (!result)
            return res.status(403).send({ error: 'Token is not valid' });

        req.auth = result;
        next();
    } else {
        res.status(401).send({ error: 'Authrorization header is missign' });
    }
}

export { jwtAuth }