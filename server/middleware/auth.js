import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

import { AUTH_PATH, HOME_PATH } from '../../constants/app';

const { API_URL } = process.env;

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
 *  - `accessToken` is the token to call Auth0 API (not needed in most cases)
 *  - `extraParams.id_token` has the JSON Web Token
 *  - `profile` has all the information from the user
 */
async function onVerify(accessToken, refreshToken, extraParams, profile, next) {
  if (!(profile && profile.id)) {
    // We didn't get a valid response back from Auth0.
    throw Error('Auth: Invalid profile.');
  }

  const {
    email,
    name,
    nickname,
    picture,
    updated_at, /* eslint-disable-line camelcase */
  } = profile._json; /* eslint-disable-line no-underscore-dangle */

  const data = {
    // Auth0 ids come back in the form of 'type|id', eg:
    //  - Username/Password: 'auth0|5b3298307ddc051b6f8f7686'
    //  - Github: 'github|123456'
    auth: profile.id,
    email,
    imageURL: picture,
    name: name === email ? nickname : name,
    updatedAt: updated_at,
  };

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();

    next(null, user);
  } catch (error) {
    next(error);
  }
}

function serializeUser(user, next) {
  next(null, user.id);
}

async function deserializeUser(id, next) {
  try {
    const res = await fetch(`${API_URL}/user/${id}`);
    const user = await res.json();
    next(null, user);
  } catch (error) {
    next(error);
  }
}

passport.use(new Auth0Strategy(authConfig, onVerify));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
