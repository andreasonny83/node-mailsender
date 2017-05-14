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
const app = require('express')();
const bodyParser = require('body-parser');
const pkginfo = require('pkginfo')(module);
const emailSender = require('./email-sender');

const port = process.env.PORT || 8009;
const debug = process.env.DEBUG === 'true' || false;

const appName = module.exports.name;
const appVersion = module.exports.version;

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use(function(req, res, next) {
  /**
   * urls should be semicolumn separated
   * eg. http://my.website.com;https://my.website.com;http://wwww.another.website.com
   */
  const whitelistUrls = (process.env.CLIENT_URLS || '').split(';');
  const origin = req.headers.origin;

  if (debug) {
    console.log('[LOG] Request coming from:', origin);
  }

  console.log(req.headers);

  // Website you wish to allow to connect
  if (whitelistUrls.indexOf(origin) > -1) {
    if (debug) {
      console.log('[LOG] Whitelisting ' + origin + ' domain');
    }

    res.header('Access-Control-Allow-Origin', origin);
  } else if (req.headers.host !== `localhost:${port}`) {
    // allow everything when running on a local environment
    if (debug) {
      console.log('[LOG] Invalid request coming from:', origin);
    }

    // Send Forbidden if the request is not coming from a whitelisted domain
    return res.sendStatus(403);
  }

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin');
  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');

  next();
});

app.use('/send', emailSender);

app.get('/status', (req, res) => {
  const data = {
    app: appName,
    version: appVersion,
    status: 200,
    message: 'OK - ' + Math.random().toString(36).substr(3, 8),
    time: new Date()
  };

  res.status(200).json(data);
});

app.listen(port, function() {
  console.log(`Express server is listening on http://localhost:${port}`);

  console.log([
    'env = ' + app.get('env'),
    '__dirname = ' + __dirname,
    'process.cwd = ' + process.cwd(),
  ].join('\n'));
});
