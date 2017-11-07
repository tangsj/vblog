import Vue from 'vue';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App';
import router from './router';

Vue.use(iView);

Vue.config.productionTip = false;

// request interceptor
axios.interceptors.request.use((config) => {
  const delimiter = config.url.indexOf('?') !== -1 ? '&' : '?';
  config.url += `${delimiter}_d=${Date.now()}`;
  // 修改数据提交格式为，form-data
  // config.transformRequest = [data => qs.stringify(data)];
  return config;
}, (error) => {
  console.log('请求失败，网络状况不佳');
  return Promise.reject(error);
});

// response interceptor
axios.interceptors.response.use((response) => {
  response.data.status = parseInt(response.data.status, 10);

  if (response.status === 200) {
    if (response.data.status !== 0) { // 接口返回失败状态
      alert(response.data.msg);
      return null;
    }
    return response.data; // 正常返回数据
  }
  return null;
}, (error) => {
  const status = error.response.status;
  console.log(status === 500 ? '服务处理请求失败！' : '请求失败，网络状况不佳');
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
