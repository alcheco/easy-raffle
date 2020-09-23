import Vue from 'vue'
import App from './App.vue'
import router from './router';
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
/* CHANGE LANGUAGE HERE */
import lang from './assets/json/lang/en.json';

lang.install = function(){
  Object.defineProperty(Vue.prototype, '$lang', {
    get () { return lang }
  })
}

Vue.use(BootstrapVue);
Vue.use(lang);
Vue.config.productionTip = false
Vue.router = router;
App.router = Vue.router;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')