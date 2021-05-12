import { removePlayer, updatePlayerName } from '../services/playerService.js'
import { jwtAuth } from '../express-middlewares/jwtAuthentication.js'
import { removeRefreshToken } from '../services/tokenService.js'
import { disconnectSocketForPlayer } from '../socketIo/socket.js';
import authExpireRepositoy from '../repositories/authExpireRepository.js';
import { io } from '../socketIo/socket.js'

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

		io.emit('player-removed', playerId);
		res.sendStatus(200);
	});

	app.put('/poker/players', jwtAuth, (req, res) => {
		const { playerId } = req.auth;
		const { body } = req;

		if (body.name.length < 1) {
			return res.status(400).send({ error: 'Name must be at least 1 character' });
		}

		const player = updatePlayerName(playerId, body.name);
		if (!player)
			return res.status(500).send({ error: 'Failed to update player' });

		io.emit('player-updated', player);
		res.send(player)
	});
}

export { register }