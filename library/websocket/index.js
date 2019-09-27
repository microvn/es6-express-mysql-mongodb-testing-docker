'use strict';

// import * as amz from './amz';
import configs from '../../config';
import request from 'request-promise';

export const pushMessage = async (_data) => {
    try {
        await request({
            uri: `${configs.wsUrl}/api/ws`,
            json: true,
            body: _data,
            method: 'POST',
        });
        console.log('Send WS Success');
    } catch (e) {
        console.log('Error Push Message To Websocket', e);
        return false;
    }
};
