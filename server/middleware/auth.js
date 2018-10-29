// @flow

import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import { stringify } from 'qs';

import api from '../../utils/api';
import generateToken from '../utils/generateToken';
import membershipToUser from '../../utils/membershipToUser';

import { AUTH_PATH, HOME_PATH, INDEX_PATH } from '../../constants/app';
import { Id, Request, Response, User } from '../../constants/types';

const { AUTH0_CALLBACK_URL } = process.env;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const ORG_ID = process.env.ORG_ID || '';

/**
 * Handle user authentication on a per-route basis all in one place.
 */
export function checkAuth(req: Request, res: Response, next: Function) {
  const isAuthenticated = req.isAuthenticated();
  let redirectPath;

  switch (req.baseUrl + req.path) {
    // Just log the user out and redirect to the index page.
    case '/logout':
      req.logout();
      redirectPath = INDEX_PATH;
      break;

    // Only accessible when user is logged out.
    case AUTH_PATH:
    case INDEX_PATH:
    case AUTH0_CALLBACK_URL:
      if (isAuthenticated) {
        redirectPath = HOME_PATH;
      }
      break;

    // Require user to be logged in for any other path.
    default:
      if (!isAuthenticated) {
        // Remember where the user is going before sending to the login screen.
        req.session.redirectPath = req.url;
        redirectPath = AUTH_PATH;
      }
      break;
  }

  if (redirectPath) {
    res.redirect(redirectPath);
  } else {
    next();
  }
}

/**
 * Generate an auth token for API requests, fetch the org info, and make both
 * available on the request object.
 */
export async function initializeAuth(
  req: Request,
  res: Response,
  next: Function,
) {
  const user = req.user || {};
  const authToken = generateToken({ user: user.id });

  req.authToken = authToken;

  try {
    req.org = await api(`/org/${ORG_ID}`, { authToken });
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Configure the strategy for use by Passport.
 */
const authConfig = {
  audience: `https://${AUTH0_DOMAIN}/userinfo`,
  domain: AUTH0_DOMAIN,
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
async function onVerify(
  accessToken: string,
  refreshToken: string,
  extraParams: Object,
  profile: Object,
  next: Function,
) {
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

function serializeUser(user: User, next: Function) {
  next(null, user.id);
}

async function deserializeUser(id: Id, next: Function) {
  try {
    const query = stringify({
      populate: 'user',
      query: JSON.stringify({
        org: ORG_ID,
        user: id,
      }),
      select: ['roles', 'user'].join(','),
    });

    const memberships = await api(`/membership?${query}`, {
      authToken: generateToken({ user: id }),
    });

    const membership = memberships.length && memberships[0];

    next(null, membershipToUser(membership));
  } catch (error) {
    next(error);
  }
}

passport.use(new Auth0Strategy(authConfig, onVerify));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
