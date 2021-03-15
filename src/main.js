import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueGoogleCharts from 'vue-google-charts'

Vue.use(Antd);
Vue.use(VueGoogleCharts)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
