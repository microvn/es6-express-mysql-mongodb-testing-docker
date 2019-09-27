'use strict';

import schedule from 'node-schedule';
import $fn from '../../modules/functions';
import '../database/index';

schedule.scheduleJob('* * * * *', async () => {
    console.log('Start Schedule * * * * *');
    $fn.helpers.md5('1');
});

