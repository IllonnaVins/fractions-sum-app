import Vue from 'vue';
import App from './App.vue';
import store from './store';

import 'sanitize.css/sanitize.css';
import 'sanitize.css/forms.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
