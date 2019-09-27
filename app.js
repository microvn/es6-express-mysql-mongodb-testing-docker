import express from 'express';
import logger from 'morgan';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import * as authMiddle from './modules/auth/middleware';
import routes from './modules/routes';
import wsController from './modules/websocket';
import cors from 'cors';
import socketIO from 'socket.io';
import swagger from 'express-swagger-generator';
import configs from './config';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
//
if (configs.WS === 'true') {
    app.use(function (req, res, next) {
        req.io = io;
        next();
    });
}
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1);
app.use(authMiddle.throttleLimit());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddle.init());
app.use(authMiddle.mapReqToRes);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Document API
swagger(app)(configs.generator);

// Group Event On Socket
if (configs.WS === 'true') {
    console.log('Websocket Successfully!');
    wsController(io);
}

// Group Routes API
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.send({
        message: err.message,
        error: err.status,
    });
});


export { app, server };
