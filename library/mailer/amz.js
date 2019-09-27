'use strict';
import ses from 'node-ses';
import configs from '../../config';
import $func from '../../modules/functions';

const client = ses.createClient({
  key: '',
  secret: '',
});

export const sendMail = (_message) => {
  console.log(_message)
  client.sendEmail({
    to: 'test@gmail.com',
    from: 'tester@gmail.com',
    subject: 'greetings',
    message: 'your <b>message</b> goes here',
    altText: 'plain text',
  }, function (err, data, res) {
    // ...
    console.log(err)
    console.log(res);
  });
};
