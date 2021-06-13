import { updatePlayerName } from '../../services/playerService.js';
import { jwtAuth } from '../middlewares/jwtAuthentication.js';
import { io as tableIo } from '../../sockets/tableSocket.js';
import { createPlayerPayload } from './api-payloads.js';
import { createErrorPayload } from '../common/common-payloads.js';

function register(app) {  
	app.put('/poker/players', jwtAuth, async (req, res) => {
		const { playerId } = req.auth;
		const { body } = req;

		if (body.name.length < 1) {
			return res.status(400).send(createErrorPayload('Name must be at least 1 character'));
		}

		let player = await updatePlayerName(playerId, body.name);
		if (!player)
			return res.status(500).send(createErrorPayload('Failed to update player'));

		player = {
			...player,
			isMe: true
		}

		tableIo.emit('player-name-change', player);
		res.send(createPlayerPayload(player));
	});
}

export { register }