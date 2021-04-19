import { createAuthToken, getRefreshToken } from '../services/tokenService.js'
import { verifyRefreshToken } from '../jwt/tokenHandler.js'

function register(app) {
    app.post('/auth/refresh-token', (req, res) => {
        const { body } = req;
      
        const payload = verifyRefreshToken(body.refreshToken);
        const tokenEntity = getRefreshToken(payload.playerId);
        if (!body.refreshToken === tokenEntity.refreshToken)
          res.sendStatus(401);
      
        const authToken = createAuthToken(payload.playerId, payload.tableId);
        res.send({
          authToken
        })
      });
}

export { register }