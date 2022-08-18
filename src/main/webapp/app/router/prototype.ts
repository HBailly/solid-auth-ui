import Home from '@/prototype/home/home.vue';
import Refusal from '@/prototype/refusal/refusal.vue';
import Videos from '@/videos/videos.vue';
import Glossary from '@/glossary/glossary.vue';
import Trial from '@/trials/demo/demo.vue';

export default [
  {
    path: '/prototype/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/prototype/tutorial',
    name: 'Tutorial',
    component: Videos,
  },
  {
    path: '/prototype/glossary',
    name: 'Glossary',
    component: Glossary,
  },
  {
    path: '/prototype/trial',
    name: 'Trial',
    component: Trial,
  },
  {
    path: '/refusal/',
    name: 'Refusal',
    component: Refusal,
  },
];
