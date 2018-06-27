# Web

## Installation

Clone the repo:
```
$ git clone https://github.com/yekrojam/web.git
```

Install dependencies:
```
$ yarn install
```

Build the client-side bundle:
```
$ yarn client
```

Start the server:
```
$ yarn server
```

*Note*: You will need the Auth0 domain, client id, and client secret to the `.env` file for auth to work.

## Linting and Tests

The linter currently just uses the AirBnB config. To lint:
```
$ yarn lint
```

The testing suite uses Karma, Mocha, Chai, and Enzyme. To test:
```
$ yarn test
```
