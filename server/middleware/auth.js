import { find } from 'lodash';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

import { AUTH_PATH, HOME_PATH } from '../../constants/app';

export function redirectIfAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect(HOME_PATH);
  }
}

export function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    // Remember where the user is going before sending to the login screen.
    req.session.redirectPath = req.url;
    res.redirect(AUTH_PATH);
  }
}

/**
 * Configure the strategy for use by Passport.
 */
const authConfig = {
  audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`,
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
  scope: ['openid', 'profile', 'email'].join(' '),
};

/**
 * Response from Auth0:
 *  - `accessToken` is the token to call Auth0 API (not needed in the most cases)
 *  - `extraParams.id_token` has the JSON Web Token
 *  - `profile` has all the information from the user
 */
function onVerify(accessToken, refreshToken, extraParams, profile, next) {
  if (!(profile && profile.id)) {
    // We didn't get a valid response back from Auth0.
    throw Error('Auth: Invalid profile.');
  }

  // Auth0 ids come back in the form of 'type|id', eg:
  //  - Username/Password: 'auth0|5b3298307ddc051b6f8f7686'
  //  - Github: 'github|123456'
  // const [type, id] = profile.id.split('|');

  // TODO: Log the user into the app:
  //  - Create the user if they don't already exist.
  //  - Retrieve the user's info if they do.

  // Questions:
  //  - Do we allow different connections (eg: username/pw, Github, etc.)?
  //  - If so, how do we match a user logging in under different account?
  //    Note (eric): My guess is we match across accounts using email address,
  //    meaning that needs to be unique.
  // next(null, { id, type });

  // TEMPORARY: Hard-code a test user's id.
  next(null, { id: '4c7f2dbe-489f-4b8b-a7a5-e9b0de4a586e' });
}

function serializeUser(user, next) {
  next(null, user.id);
}

function deserializeUser(id, next) {
  // TODO: Fetch the user's info using the API.
  fetch('https://randomuser.me/api?format=pretty&seed=majorkey&results=50')
    .then(res => res.json())
    .then((data) => {
      const user = find(data.results, u => u.login.uuid === id);
      next(null, {...user, id});
    })
    .catch((error) => {
      next(error);
    });
}

passport.use(new Auth0Strategy(authConfig, onVerify));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
