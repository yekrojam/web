# Web

[![build status](https://img.shields.io/travis/yekrojam/web/master.svg?style=flat-square)](https://travis-ci.org/yekrojam/web)

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

## Todos
An incomplete list:
- [ ] Logging
- [ ] Better error handling
- [ ] Code-splitting
- [ ] Hot module reloading on server
- [x] Connect to CI service (TravisCI)
- [x] Fix React testing errors
