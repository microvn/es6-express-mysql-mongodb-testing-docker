import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import validate from 'mongoose-validator';
import mongoose_delete from 'mongoose-delete';
import timestamps from 'mongoose-timestamp';
import beautifyUnique from 'mongoose-beautiful-unique-validation';
import {getImages} from '../../../../modules/helper/helper';
import configs from '../../../../config';

let userSchema = new mongoose.Schema({
    fullName: {
        type: 'String',
    },
    preferredName: {
        type: 'String',
    },
    email: {
        type: 'String',
        required: true,
        index: true,
        unique: true,
        validate: [validate({
            validator: 'isEmail',
            message: configs.text.common.emailValidate,
        })],
    },
    password: {
        type: 'String',
        required: true,
        bcrypt: true,
        validate: [validate({
            validator: 'isLength',
            arguments: [8, 64],
            message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
        })],
    },
    deviceToken: [{
        type: 'String',
    }],
    lastLogin: {
        type: 'Date',
    },
    deviceId: ['String'],
    socketId: [{
        type: 'String',
    }]
}, {
    collection: 'users', versionKey: false,
    toObject: {
        transform: function (doc, instance, opt) {
            instance['cover'] = getImages(instance['cover']);
            delete instance['password'];
            return instance;
        },
    },
});

userSchema.pre('save', function (next) {
    if (this.email) this.email = this.email.toLowerCase();
    next();
});


userSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.email) this._update.email = this._update.email.toLowerCase();
    next();
});

userSchema.plugin(bcrypt);
userSchema.plugin(timestamps);
userSchema.plugin(beautifyUnique);
userSchema.plugin(mongoose_delete, {deletedAt: true, overrideMethods: 'all'});

export default mongoose.model('Users', userSchema);
