import { register as registerAuthApis } from './auth/index.js';
import { register as registerPlayerApis } from './player/index.js';
import { register as registerTableApis } from './table/index.js';

function loadApis(app) {
  registerAuthApis(app);
  registerPlayerApis(app);
  registerTableApis(app);
}

export default { loadApis };