const nodemailer = require('nodemailer');
const app = require('express')();
const router = require('express').Router();
const port = process.env.PORT || 8009;

const host = process.env.HOST_NAME;
const portNo = process.env.PORT_NUMBER;
const user = process.env.USER_NAME;
const pass = process.env.PASSWORD;
const secure = process.env.SECURE || false;
const secureConnection = process.env.SECURE_CONNECTION || null;
const rejectUnauthorized = process.env.REJECT_UNAUTHORIZED || null;
const ciphers = process.env.CIPHERS || false;

app.use('/send', router);

router.get('/', sendEmail); // handle the route at yourdomain.com/sayHello

function sendEmail(req, res) {
  // Not the movie transporter!
  const transporter = nodemailer.createTransport({
    host: host,
    port: portNo,
    secure: secure,
    secureConnection: secureConnection,
    auth: {
      user: user, // Your email id
      pass: pass // Your password
    }
  });

  if (!!rejectUnauthorized || rejectUnauthorized === 'false') {
    transporter.tls = {
      rejectUnauthorized: rejectUnauthorized
    }
  }

  if (!!ciphers) {
    if (!transporter.hasOwnProperty('tls')) {
      transporter.tls = {};
    }

    transporter.tls.ciphers = ciphers;
  }

  var mailOptions = {
    from: '"Our Code World " <noreply@sonnywebdesign.com>', // sender address (who sends)
    to: 'andreasonny83@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.json({yo: 'error'});
    } else {
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
    };
  });
}

app.listen(port, function() {
  console.log(`Express server is listening on http://localhost:${port}`);

  console.log([
    'env = ' + app.get('env'),
    '__dirname = ' + __dirname,
    'process.cwd = ' + process.cwd()
  ].join('\n'));
});
