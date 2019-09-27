'use strict';
import User from '../../library/database/mongo/models/user';


const getInfo = async (_id, _column) => {
    return await User.findById(_id, _column);
};

export {
    getInfo,
};
