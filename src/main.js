import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import TreeMenu from './components/TreeMenu.vue'
import _ from 'lodash'; 

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);
Vue.component('tree-menu', TreeMenu);


new Vue({
  el: '#app',
  render: h => h(App),
})
