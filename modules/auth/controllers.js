import $fn from '../functions';
import _ from 'lodash';
import configs from '../../config';


/**
 * API GET USER FROM TOKEN
 * @route GET /api/auth/me
 * @group Auth - Operations about Authentication
 * @security JWT
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
export const me = async (req, res, next) => {
  $fn.response.success(res, req.user);
};

