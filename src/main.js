import Vue from 'vue'
import App from './App.vue'
import router from './router';
/* CHANGE LANGUAGE HERE */
import lang from './assets/json/lang/en.json';

lang.install = function(){
  Object.defineProperty(Vue.prototype, '$lang', {
    get () { return lang }
  })
}

Vue.use(lang);
Vue.config.productionTip = false
Vue.router = router;
App.router = Vue.router;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')