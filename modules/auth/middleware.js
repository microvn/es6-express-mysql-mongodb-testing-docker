/*
 * Copyright (c) 2019.
 * Author HoangNguyen
 * Email microvn.gm@gmail.com
 * Company: MobileFolk
 */

import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import configs from '../../config';
import $fn from '../functions';
import multer from 'multer';
import path from 'path';
import rateRequestLimit from 'express-rate-limit';

const _authorizeJWT = (_options = null) => {
    let jwtOptions = {
        secretOrKey: configs.jwt.key,
        passReqToCallback: true,
    };
    if (_options) jwtOptions = Object.assign(jwtOptions, _options);
    return new Strategy(jwtOptions, async (request, jwt_payload, done) => {
        if (!jwt_payload._id || !jwt_payload.type) return done(null, false);
        [err, user] = await $fn.helpers.wait($fn.users.getInfo(jwt_payload._id));
        if (err) return done(err, false);
        if (user) {
            if (user.status === 0) return done(null, false);
            request.user = user;
            return done(null, true);
        } else {
            return done(null, false);
        }
    });
};


export const init = () => {
    let options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
    };
    passport.use('jwt', _authorizeJWT(options));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        console.log('deserializeUser', id);
        done(null, id);
    });

    return passport.initialize();
};


export const socketAuthorize = () => {
    let options = {
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    };
    const strategy = _authorizeJWT(options);
    return (socket, accept) => {
        // Handle After Accept Request
        strategy.success = function success(user) {
            accept();
        };
        // Handle Fail Request
        strategy.fail = info => accept(new Error(info));

        // Handle Error Request
        strategy.error = error => accept(error);

        strategy.authenticate(socket.request, {});
    };
};


export const isAuth = (req, res, next) => passport.authenticate('jwt', {session: false}, (err, result) => {
    if (!result) {
        return $fn.response.forbiddenError(res, configs.text.common.lockedUser);
    } else {
        next();
    }
})(req, res, next);

export const mapReqToRes = (req, res, next) => {
    if (req) {
        res.info = {url: req.originalUrl, header: req.headers};
    }
    next();
};

export const throttleLimit = () => {
    return rateRequestLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        message: {
            meta: {
                status: 403,
                message: 'Too many request from this IP, please try again after a minutes',
            },
        },
    });
};

export const isUploadWithoutAuthen = (req, res, next) => multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            await $fn.helpers.createDir(`${configs.upload.pathImage}tmp`);
            cb(null, `${configs.upload.pathImage}tmp`);
        },
        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name;
            const ext = path.extname(file.originalname);
            cb(null, `${fileName}_${Date.now()}${ext}`);
        },

    }),
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        const mimeType = file.mimetype;
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && mimeType !== 'image/png' && mimeType !== 'image/jpg' && mimeType !== 'image/jpeg' && ext !== '.mp3' && ext !== '.wav' && mimeType !== 'audio/mp3') {
            req.fileValidationError = `${file.originalname} ${configs.upload.textFilter}`;
            return callback(null, false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 10024 * 1024,
    },
}).array('files', configs.upload.maxFiles)(req, res, function (err) {
    if (err) {
        return $fn.response.clientError(res, err.message);
    }
    next();
});

export const isUploadImagesMutiple = (req, res, next) => multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            await $fn.helpers.createDir(`${configs.upload.pathImage}${req.user._id}/images`);
            cb(null, `${configs.upload.pathImage}${req.user._id}/images`);
        },
        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name;
            const ext = path.extname(file.originalname);
            cb(null, `${fileName}_${Date.now()}${ext}`);
        },

    }),
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        const mimeType = file.mimetype;
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && mimeType !== 'image/png' && mimeType !== 'image/jpg' && mimeType !== 'image/jpeg') {
            req.fileValidationError = `${file.originalname} ${configs.upload.textFilter}`;
            return callback(null, false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 5024 * 1024,
    },
}).array('images', configs.upload.maxFiles)(req, res, function (err) {
    if (err) {
        return $fn.response.clientError(res, err.message);
    }
    next();
});

export const isUploadAudioMutiple = (req, res, next) => multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            await $fn.helpers.createDir(`${configs.upload.pathImage}${req.user._id}/audio`);
            cb(null, `${configs.upload.pathImage}${req.user._id}/audio`);
        },
        filename: function (req, file, cb) {
            const fileName = path.parse(file.originalname).name;
            const ext = path.extname(file.originalname);
            cb(null, `${fileName}_${Date.now()}${ext}`);
        },

    }),
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        const mimeType = file.mimetype;
        if (ext !== '.mp3' && ext !== '.wav' && mimeType !== 'audio/mp3') {
            req.fileValidationError = `${file.originalname} ${configs.upload.textFilter}`;
            return callback(null, false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 10024 * 1024,
    },
}).array('audio', configs.upload.maxFiles)(req, res, function (err) {
    if (err) {
        return $fn.response.clientError(res, err.message);
    }
    next();
});
