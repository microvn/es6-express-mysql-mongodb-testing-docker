import express from 'express';
import $fn from './functions';
import * as AuthController from './auth/controllers';
import * as UsersController from './users/controllers';
import * as UploadController from './upload/controllers';
import {
    isAuth,
    isUploadImagesMutiple,
    isUploadAudioMutiple,
    isUploadWithoutAuthen,
} from './auth/middleware';


const router = express.Router();

//Modules Home
router.get('/', (req, res, next) => $fn.response.success(res));
//Auth Modules
router.get('/auth/me', isAuth, AuthController.me);
// Upload/Download Routes
router.post('/user/upload/image', [isAuth, isUploadImagesMutiple], UploadController.uploadImage);
router.post('/user/upload/audio', [isAuth, isUploadAudioMutiple], UploadController.uploadAudio);
// User Routes
router.get('/user/:id', UsersController.getDetail);


export default router;
