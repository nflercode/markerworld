import { removePlayer } from '../services/playerService.js'
import { jwtAuth } from '../middlewares/jwtAuthentication.js'
import { removeRefreshToken } from '../services/tokenService.js'

function register(app) {  
    app.delete('/poker/players', jwtAuth, (req, res) => {
        console.log(req.auth);
        const { playerId } = req.auth;

        removePlayer(playerId);
        removeRefreshToken(playerId);
    
        res.sendStatus(200);
    });
}

export { register }