import { removePlayer } from '../services/playerService.js'
import { jwtAuth } from '../express-middlewares/jwtAuthentication.js'
import { removeRefreshToken } from '../services/tokenService.js'
import { disconnectSocketForPlayer } from '../socketIo/socket.js';
import authExpireRepositoy from '../repositories/authExpireRepository.js';

function register(app) {  
	app.delete('/poker/players', jwtAuth, (req, res) => {
		const { playerId } = req.auth;

		const playerRemoved = removePlayer(playerId);
		if (!playerRemoved) {
			console.error(`Failed to remove player ${playerId}`);
			return res.status(500).send({ error: 'Failed to remove player' });
		}
		
		const refreshTokenRemoved = removeRefreshToken(playerId);
		if (!refreshTokenRemoved) {
			console.log(`Failed to remove refreshToken for player ${playerId}`);
			return res.status(500).send({ error: 'Failed to remove player' });
		}

		disconnectSocketForPlayer(playerId);
		authExpireRepositoy.deleteExpiration(playerId);

		// TODO: Invalidate authToken

		res.sendStatus(200);
	});
}

export { register }