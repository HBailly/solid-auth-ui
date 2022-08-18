import About from '@/about/about.vue';
import Literature from '@/about/literature/literature.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/about/literature',
    name: 'Literature',
    component: Literature,
  },
];
