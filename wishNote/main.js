import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
Vue.prototype.baseUrl = "https://35cebfb4.cpolar.cn"
Vue.prototype.showErr = function(){
	uni.showToast({
		title:'请求失败',
		icon:'none'
	})
}
app.$mount()
// #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif