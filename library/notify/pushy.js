'use strict';
import Pushy from 'pushy';
import configs from '../../config';
import $func from '../../modules/functions';

/**
 *
 * @param message - Text Message
 * @param deviceToken - deviceToken of Target
 * @param topic - Topic if push more device
 */
export const pushNotify = (_data) => {
    return new Promise((resolve, reject) => {
        if (!_data.data || (!_data.deviceToken || !_data.type)) return resolve(false);
        const pushyService = new Pushy(configs.notify.pushyKey);

        let to = _data.deviceToken ? _data.deviceToken : _data.topic;

        // // Set optional push notification options (such as iOS notification fields)
        let options = {
            notification: {
                sound: 'ping.aiff',
                body: _data.data.message,
                title: _data.data.title,
            },
        };
        pushyService.sendPushNotification(_data.data, to, options, function (err, id) {
            if (err) {
                console.log('err pushy', err);
                resolve(err);
            }
            console.log(`Push sent successfully! (ID: ${id})`);
            resolve(id);
        });
    });
};
