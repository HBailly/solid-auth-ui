import Vuex from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import VueCookie from 'vue-cookie';
import Vuelidate from 'vuelidate';
import Vue2Filters from 'vue2-filters';

import * as filters from '@/shared/date/filters';
import { accountStore } from '@/shared/config/store/account-store';

export function initVueApp(vue) {
  vue.use(VueCookie);
  vue.use(Vuelidate);
  vue.use(Vue2Filters);
  filters.initFilters();
}

export function initFortAwesome(vue) {
  // http://fontawesome.com/search?s=solid
  library.add(fas);
  library.add(fab);
}

export function initVueXStore(vue) {
  vue.use(Vuex);
  return new Vuex.Store({
    modules: {
      accountStore,
    },
  });
}
