import Admin from './controllers/AdminController';
import Home from './controllers/HomeController';
import Index from './controllers/IndexController';
import NotFound from './controllers/NotFoundController';
import Profile from './controllers/ProfileController';

import { HOME_PATH, INDEX_PATH } from '../constants/app';

export default [
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
    path: '/admin',
    component: Admin,
  },
  {
    path: '*',
    component: NotFound,
  },
];
