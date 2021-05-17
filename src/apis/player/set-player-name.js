import { updatePlayerName } from '../../services/playerService.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { io as tableIo } from '../../sockets/tableSocket.js';
import { createPlayerPayload } from './api-payloads.js';

function register(app) {  
	app.put('/poker/players', jwtAuth, (req, res) => {
		const { playerId } = req.auth;
		const { body } = req;

		if (body.name.length < 1) {
			return res.status(400).send(createErrorPayload('Name must be at least 1 character'));
		}

		const player = updatePlayerName(playerId, body.name);
		if (!player)
			return res.status(500).send(createErrorPayload('Failed to update player'));

		tableIo.emit('player-updated', player);
		res.send(createPlayerPayload(player))
	});
}

export { register }