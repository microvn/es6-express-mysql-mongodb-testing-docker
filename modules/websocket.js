import $fn from '../modules/functions';
import * as authMiddle from './auth/middleware';
import * as Notify from '../library/notify';
import moment from 'moment';

export default (io) => {
    // Authenticate for Socket;
    let userOnline = {};
    io.use(authMiddle.socketAuthorize());
    io.on('connect', async (socket) => {
        try {
            console.log('Connected from client', socket.id);
            let currentUser = socket.request.user;
            currentUser = currentUser.toObject();
            // HoangHN - Push Data User via JWT Token
            socket.emit('infoUser', currentUser);

            // HoangHN - Handle User Disconnect WS
            socket.on('disconnect', async () => {
                console.log('Remove SocketId', currentUser);
            });
        } catch (e) {
            // HoangHN - Handle All Error From BackEnd
            socket.emit('errorBackend', {
                error: true,
                message: e.message,
            });
        }
    });

};
