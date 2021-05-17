import { register as registerRefreshAuthToken } from './refresh-auth-token.js';

function register(app) {
  registerRefreshAuthToken(app);
}

export { register }