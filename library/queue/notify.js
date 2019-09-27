import Configs from '../configs';
import Bull from 'bull';
import Request from 'request';

module.exports = () => {
    const NotifyQueue = new Bull('NotifyQueue', {redis: Configs.queue});
    NotifyQueue.process(async (job, done) => {
        if (job.data) {

        } else {
            done();
        }
    });
};