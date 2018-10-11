import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import { stringify } from 'qs';

import api from '../../utils/api';
import generateToken from '../utils/generateToken';

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
 *  - `accessToken` is the token to call Auth0 API (not needed in most cases)
 *  - `extraParams.id_token` has the JSON Web Token
 *  - `profile` has all the information from the user
 */
async function onVerify(accessToken, refreshToken, extraParams, profile, next) {
  /* eslint-disable-next-line no-underscore-dangle */
  if (!(profile && profile._json && profile._json.email)) {
    // We didn't get a valid response back from Auth0.
    next('Invalid auth profile.');
    return;
  }

  /* eslint-disable-next-line no-underscore-dangle */
  const { email } = profile._json;

  const query = stringify({
    query: JSON.stringify({ email }),
  });

  try {
    const users = await api(`/user?${query}`, {
      authToken: generateToken({}),
    });

    const user = users.length && users[0];

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
    const user = await api(`/user/${id}`, {
      authToken: generateToken({ id }),
    });
    next(null, user);
  } catch (error) {
    next(error);
  }
}

passport.use(new Auth0Strategy(authConfig, onVerify));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
