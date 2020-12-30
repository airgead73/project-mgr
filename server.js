const http = require('http');
const app = require('./app/app');
const { PORT } = require('./app/config/env');
const server = http.createServer(app);

server.listen(PORT, () => console.log(`*** Server is running on port ${PORT}... ***`));