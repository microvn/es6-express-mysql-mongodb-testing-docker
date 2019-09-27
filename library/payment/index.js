'use strict';

import * as stripe from './stripe';
import configs from '../../config';

export const createCharge = async (_data) => {
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'stripe':
            return await stripe.createCharge(_data);
    }
};

export const refundCharge = async (_data) => {
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'stripe':
            return await stripe.refund(_data);
    }
};

export const createCustomerId = async (_data) => {
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'stripe':
            return await stripe.createCustomer(_data);
    }
};

export const chargeByCustomerId = async (_data) => {
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'stripe':
            return await stripe.chargeByCustomerId(_data);
    }
};

export const captureCharge = async (_chargeId) => {
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'stripe':
            return await stripe.capture(_chargeId);
    }
};


export const verifyCode = async (_data) => {
    if (!_data.phoneNumber || !_data.areaCode || !_data.verifyCode) return false;
    const smsDriver = configs.payment.driver;
    switch (smsDriver) {
        case 'twilio':
            return await twilio.verifyCode(_data);

    }
};
