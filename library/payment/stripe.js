'use strict';
import Stripe from 'stripe';
import configs from '../../config';

const stripe = Stripe(configs.payment.stripeKey);

export const createCharge = async (_data) => {
    return await stripe.charges.create({
        amount: Math.round(_data.price * 100),
        currency: 'usd',
        metadata: { },
        source: _data.stripeBooking,
        capture: _data.hold,
    });
};

export const chargeByCustomerId = async (_data) => {
    return await stripe.charges.create({
        amount: Math.round(_data.price * 100),
        currency: 'usd',
        metadata: { orderId: _data.bookingId.toString() },
        customer: _data.customerId,
        capture: _data.hold,
    });
};

export const refund = async (_data) => {
    return await stripe.refunds.create({
        charge: _data.chargeId,
        amount: Math.round(_data.amount * 100),
    });
};

export const capture = async (_chargeId) => {
    try {
        return stripe.charges.capture(_chargeId);
    }catch( e){
        return handleError(e);
    }
};

export const createCustomer = async (_data) => {
    try {
        return await stripe.customers.create({
            source: _data.stripeBooking,
            email: _data.email,
            metadata: {

            },
            name: _data.name,
        });
    } catch (e) {
        console.log(e);
        return handleError(e);
    }
};

export const getCustomer = async (_id) => {
    try {
        return await stripe.customers.retrieve(_id);
    } catch (e) {
        return handleError(e);
    }
};

export const handleError = (_error) => {
    switch (_error.type) {
        case 'StripeCardError':
            // A declined card error
            return _error.message;
        case 'RateLimitError':
            // Too many requests made to the API too quickly
            return _error.message;
        case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            return _error.message;
        case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            return _error.message;
        case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            return _error.message;
        case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            return _error.message;
    }
};


export default { handleError, createCharge ,refund, capture};
