'use strict';
import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    urlBase: 'http://localhost:3333/api/',
    port: process.env.PORT,
    WS: process.env.WS,
    wsUrl: process.env.WEBSOCKET_DOMAIN,
    env: process.env.ENVIRONMENT,
    urlImage: process.env.HOST_IMAGE,
    upload: {
        pathImage: process.env.PATH_IMAGE,
        maxFiles: process.env.MAX_FILE_UPLOAD,
        textFilter: 'Only images are allowed!',
        textMaxFile: 'Max files Upload',
    },
    authenticate: {
        google: process.env.GOOGLE_VERIFY,
        facebook: process.env.FACEBOOK_VERIFY,
    },
    jwt: {
        key: process.env.JWT_KEY,
        expires: process.env.JWT_TIME,
        token_active: process.env.JWT_TIME_ACTIVE_TOKEN,
    },
    slack: {
        key: process.env.SLACK_KEY,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        database: process.env.REDIS_DB,
        password: process.env.REDIS_PASSWORD,
        prefix: process.env.REDIS_PREFIX,
    },
    queue: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB,
        password: process.env.REDIS_PASSWORD,
    },
    mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        response: {
            error11000: 'Input information was exist !',
        },
    },
    text: {
        common: {
            notFoundUser: 'NotFound User!',
        },
        response: {
            notFoundRes: 'Cant found response!',
            error401: 'Unauthenticated Error. Login again!',
            error403: 'Forbidden Error!',
            error404: 'Not Found!',
            error422: 'Unprocessable Entity!',
            error500: 'Internal Server Error!',
        },
        auth: {
            notCreate: 'Cant create hash!',
        },
    },
    email: {
        driver: process.env.EMAIL_DRIVER,
        sendGridKey: process.env.EMAIL_SENDGRID_KEY,
        sender: process.env.EMAIL_SENDER,
        admin: process.env.EMAIL_ADMIN,
        template: {

        },
    },
    generator: {
        swaggerDefinition: {
            info: {
                description: 'Service base on Nodejs',
                title: 'Service',
                version: '1.0.0',
            },
            host: 'api.domain.com',
            basePath: '',
            produces: [
                'application/json',
                'application/xml',
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    scheme: 'bearer',
                    name: 'Authorization',
                    description: '',
                    authenticationScheme: 'Bearer',
                },
            },
        },
        basedir: __dirname, //app absolute path
        files: ['./../modules/*/controllers.js'], //Path to the API handle folder
    },
    sms: {
        driver: process.env.SMS_DRIVER,
        enable: process.env.SMS_ENABLE,
        twilioKey: process.env.SMS_KEY_TWILIO,
    },
    notify: {
        driver: process.env.NOTIFY_DRIVER,
        pushyKey: process.env.NOTIFY_PUSHY_KEY,
    },
    payment: {
        driver: process.env.PAYMENT_DRIVER,
        stripeKey: process.env.PAYMENT_STRIPE_KEY,
    },
};

