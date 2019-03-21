const httpServerPwa = require('http-server-pwa');
 
const server = await httpServerPwa('./dist', {p: 4200});