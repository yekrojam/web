// @flow

import Admin from './controllers/AdminController';
import Home from './controllers/HomeController';
import Index from './controllers/IndexController';
import NotFound from './controllers/NotFoundController';
import Profile from './controllers/ProfileController';
import Settings from './controllers/SettingsController';

import { isAdmin } from '../utils/userUtils';
import { HOME_PATH, INDEX_PATH } from '../constants/app';
import { Member } from '../constants/types';

export default function getRoutes(user: Member) {
  const routes = [
    {
      path: INDEX_PATH,
      component: Index,
      exact: true,
    },
    {
      path: HOME_PATH,
      component: Home,
      exact: true,
    },
    {
      path: '/users/:userId',
      component: Profile,
    },
    {
      path: '/settings',
      component: Settings,
    },
  ];

  // Non-admins will just see the 404 page.
  if (isAdmin(user)) {
    routes.push({
      path: '/admin',
      component: Admin,
    });
  }

  // This must come last.
  routes.push({
    path: '*',
    component: NotFound,
  });

  return routes;
}
