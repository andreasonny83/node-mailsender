# node-mailsender

> Send email from NodeJS using Nodemailer

## Prerequisites

The project has dependencies that require Node 6.9.0 or higher, together
with NPM 3 or higher.

**Table of contents:**

1. [Installation](#installation)
1. [Usage](#usage)
1. [Environment variables](#environment-variables)
1. [Contributing](#contributing)
1. [License](#license)

## Installation

Clone this repo to your local machine with:

```sh
$ git clone https://github.com/andreasonny83/node-mailsender.git
```

Then, cd inside the project folder with:

```sh
cd node-mailsender
```

### Install the node dependencies

```sh
$ npm install
# Or Yarn for a faster installation
$ yarn install
```

## Usage

Run `npm start` for a dev server.
Navigate to `http://localhost:8009/status` to verify that
your server is up and running correctly.

The app will automatically reload if you change any of the source files.

## Environment variables

Name  | Default value | Description
--- | --- | ---
PORT | 8009 | The port where the server is listening
DEBUG | false | Enable extra debug messages
CLIENT_URLS | '' | List all the hosts from where whitelist the coming requests. They need to be separated by `;` Eg. 'https://my.website.com;http://another.website.io'

### Nodemailer configuration

Nodemailer will be set using the following environment variables

Name  | Default value | Description
--- | --- | ---
HOST_NAME | undefined | Your email host provider
PORT_NUMBER | undefined | Your email host provider port number
USER_NAME | undefined | Your email address or username
PASSWORD | undefined | Your email password
EMAIL_SENDER_ADDRESS | '' | The email address that will be displayed in the client's emails `from` field
SECURE | false | Use secure SSL
SECURE_CONNECTION | false | Use secure connection
REJECT_UNAUTHORIZED | null | Reject anouthorized requests
CIPHERS | null | ciphers must be required by your host service

## Send emails

The porpouse of this app iss sending emails. So, in order to do that, you must send a POST request to the `/send` endpoint containing the following informations in the request's `body`:

Name | Default value | Description
--- | --- | ---
from | null | The display name for the sender, the real email address will remail the one set using the `EMAIL_SENDER_ADDRESS` coming from the Environment variables.
to | null | The destinator of your email
subject | null |  Set the email's subject
text | null | If set, this will be used for displaying a text version of the email, in case the client doesn't support the HTML5 format
html | null | This will contain the HTML template you want to send in your email

## Contributing

We really appreciate your collaborations and feedbacks!

1.  Fork and clone it
1.  Install dependencies: `npm install`
1.  Create a feature branch: `git checkout -b new-feature`
1.  Commit changes: `git commit -am 'Added a feature'`
1.  Push to the remote branch: `git push origin new-feature`
1.  Create a new [Pull Request](https://github.com/andreasonny83/node-mailsender/pull/new/master)


## License

MIT © [Andrea Sonny](https://andreasonny.mit-license.org/@2017)
