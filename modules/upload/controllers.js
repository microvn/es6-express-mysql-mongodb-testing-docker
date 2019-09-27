import $fn from '../functions';
import configs from '../../config';


/**
 * API UPLOAD IMAGE WITH AUTHENTICATE
 * @route POST /api/user/upload/image
 * @group Upload - Operations about Upload
 * @param {string} query.body.required - {"images":"xxxxxx"}
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
export const uploadImage = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) return $fn.response.authenticateError(res);
        if (req.fileValidationError) return $fn.response.clientError(res, req.fileValidationError);
        if (!req.files) return $fn.response.clientError(res);
        let data = [];
        req.files.forEach((file) => {
            file.url = `${configs.urlImage}${req.user._id}/images/${file.filename}`;
            data.push(file);
        });
        return $fn.response.success(res, data);
    } catch (e) {
        console.log(e);
        return $fn.response.serverError(res, e);
    }
};

/**
 * API UPLOAD AUDIO WITH AUTHENTICATE
 * @route POST /api/user/upload/audio
 * @group Upload - Operations about Upload
 * @param {string} query.body.required - {"audio":"xxxxxx"}
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
export const uploadAudio = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) return $fn.response.authenticateError(res);
        if (req.fileValidationError) return $fn.response.clientError(res, req.fileValidationError);
        if (!req.files) return $fn.response.clientError(res);
        let data = [];
        req.files.forEach((file) => {
            file.url = `${configs.urlImage}${req.user._id}/audio/${file.filename}`;
            data.push(file);
        });
        return $fn.response.success(res, data);
    } catch (e) {
        console.log(e);
        return $fn.response.serverError(res, e);
    }
};
