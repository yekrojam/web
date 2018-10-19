import { Router } from 'express';
import passport from 'passport';

import { checkAuth } from './middleware/auth';
import sendPage from './middleware/sendPage';

import { AUTH_PATH, HOME_PATH } from '../constants/app';

const router = Router();

router.get(AUTH_PATH, checkAuth, passport.authenticate('auth0', {}));

router.get(
  process.env.AUTH0_CALLBACK_URL,
  checkAuth,
  passport.authenticate('auth0', { failureRedirect: '/' }),
  (req, res) => {
    const redirectPath = req.session.redirectPath || HOME_PATH;
    delete req.session.redirectPath;
    res.redirect(redirectPath);
  },
);

router.get('*', checkAuth, sendPage);

export default router;
