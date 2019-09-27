import $fn from '../functions';
import configs from '../../config';
import _ from 'lodash';

export const pushMessage = async (req, res, next) => {
    try {
        const _data = _.pick(req.body, ['event', 'socketId', 'data']);
        if (!_data.event || !_data.data || !_data.socketId) return $fn.response.clientError(res);
        if (_data.socketId) _data.socketId.map((item) => item && req.io.to(item).emit(_data.event, _data.data));
        return $fn.response.success(res, _data);
    } catch (e) {
        console.log(e);
        return $fn.response.serverError(res, e);
    }
};
