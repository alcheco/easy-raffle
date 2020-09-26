import Vue from 'vue';
import Router from 'vue-router';

/* Components */
import Application from '../views/public/application';
/* Components */

/* Routes */
import {PublicRoutes} from '../views/public/router';

/* Routes */

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Application,
      children: PublicRoutes,
    },
  ]
})
