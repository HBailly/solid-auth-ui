import Vue from 'vue';
import Component from 'vue-class-component';
import Router from 'vue-router';
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';
import prototype from '@/router/prototype';
import contact from '@/router/contact';
import about from '@/router/about';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');

Vue.use(Router);

// prettier-ignore
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: {error403: true}
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: {error404: true}
    },
    ...account,
    ...admin,
    entities,
    ...prototype,
    ...contact,
    ...about,
    ...pages
  ]
});

export default router;
