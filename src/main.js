import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie'
import router from './router'
import SuiVue from 'semantic-ui-vue';
import VueCarousel from 'vue-carousel';
import * as VueGoogleMaps from 'vue2-google-maps'

import 'semantic-ui-css/semantic.min.css';

var VueFire = require('vuefire')
var firebase = require('firebase')

Vue.use(VueFire)
Vue.use(VueCookie);
Vue.use(SuiVue);
Vue.use(VueCarousel);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBfwUh--pdkonSDNKnuwpaupieXu_2CmPg'
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')