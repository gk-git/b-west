import app from './server';
import http from 'http';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.PORT);

if (module.hot) {
    console.log('✅  Server-side HMR Enabled!');

    console.log("up and running on port " + process.env.PORT);
    module.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        server.removeListener('request', currentApp);
        const newApp = require('./server').default;
        server.on('request', newApp);
        currentApp = newApp;
    });
}
