/**
 * node-mailsender
 *
 * @license
 * Copyright (c) 2017 by andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/andreasonny83/node-mailsender/blob/master/LICENSE
 */
const router = require('express').Router();
const nodemailer = require('nodemailer');

const debug = process.env.DEBUG === 'true' || false;

const host = process.env.HOST_NAME;
const portNo = process.env.PORT_NUMBER;
const user = process.env.USER_NAME;
const pass = process.env.PASSWORD;
const secure = process.env.SECURE === 'true' || false;
const secureConnection = process.env.SECURE_CONNECTION === 'true' || false;
const rejectUnauthorized = process.env.REJECT_UNAUTHORIZED || null;
const ciphers = process.env.CIPHERS || null;

// Private methods

const buildTransporter = () => {
  const transporterBuilder = {
    host: host,
    port: portNo,
    secure: secure,
    secureConnection: secureConnection,
    auth: {
      user: user, // Your email id
      pass: pass // Your password
    }
  }

  if (!!rejectUnauthorized) {
    transporterBuilder.tls = {
      rejectUnauthorized: rejectUnauthorized === 'false' ? false : true
    }
  }

  if (!!ciphers) {
    if (!transporterBuilder.hasOwnProperty('tls')) {
      transporterBuilder.tls = {};
    }

    transporterBuilder.tls.ciphers = ciphers;
  }

  return transporterBuilder;
};

// Public methods

const sendEmail = (req, res) => {
  const transporterBuilder = buildTransporter();

  const transporter = nodemailer.createTransport(transporterBuilder);

  if (!!debug) {
    console.log('\ntransporter:\n============\n');
    console.log(transporter);
  }

  const mailOptions = {
    from: `'${req.body.from}' <noreply@sonnywebdesign.com>`, // sender address (who sends)
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text, // plaintext body
    html: req.body.html // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({error: 'error'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({sent: info.response});
    };
  });
};

// Router
router.post('/', sendEmail);

module.exports = router;
