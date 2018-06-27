import { Router } from 'express';
import passport from 'passport';

import { redirectIfAuthenticated, requireAuthentication } from './middleware/auth';
import sendPage from './middleware/sendPage';

import { AUTH_PATH, HOME_PATH, INDEX_PATH } from '../constants/app';

const router = Router();

router.get(INDEX_PATH, redirectIfAuthenticated, sendPage);

router.get(
  AUTH_PATH,
  redirectIfAuthenticated,
  passport.authenticate('auth0', {}),
);

router.get(
  process.env.AUTH0_CALLBACK_URL,
  redirectIfAuthenticated,
  passport.authenticate('auth0', { failureRedirect: '/' }),
  (req, res) => {
    const redirectPath = req.session.redirectPath || HOME_PATH;
    delete req.session.redirectPath;
    res.redirect(redirectPath);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(INDEX_PATH);
});

router.get('*', requireAuthentication, sendPage);

export default router;
