'use strict';
import sendGrid from '@sendgrid/mail';
import configs from '../../config';
import $func from '../../modules/functions';

export const sendMail = async (_data) => {
    try {
        sendGrid.setApiKey(configs.email.sendGridKey);
        await sendGrid.send({
            to: _data.receiver,
            from: {
                email: _data.sender,
                name: _data.fromName,
            },
            cc: _data.cc,
            subject: _data.subject,
            text: _data.text,
            html: _data.html,
            templateId: _data.templateId,
            dynamic_template_data: _data.templateData,
        });
        return true;
    } catch (e) {
        console.log('Send Email Failed', e.toString(), configs.email.sendGridKey);
        return false;
    }

};
