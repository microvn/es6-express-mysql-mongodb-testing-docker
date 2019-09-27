import $fn from '../functions';
import configs from '../../config';
import _ from 'lodash';

/**
 * API GET DETAIL USER, replace id = ObjectId; egs: 5cd258ca8145c92f316beb7d
 * @route GET /api/user/5cd258ca8145c92f316beb7d
 * @group Users - Operations about Users
 * @returns {object} 200 - Object
 * @returns {Error}  default - Unexpected error
 */
export const getDetail = async (req, res, next) => {
    try {
        let _data = _.pick(req.params, ['id']);
        const [err, user] = await $fn.helpers.wait($fn.users.getInfo(_data.id));
        if (!user || !user.id) return $fn.response.notFound(res, configs.text.common.notFoundUser);
        if (err) return $fn.response.serverError(res);
        $fn.response.success(res, user.toObject());
    } catch (e) {
        return $fn.response.serverError(res, e);
    }
};
