import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import iView from 'iview';
import VueBus from 'vue-bus';
import 'iview/dist/styles/iview.css';
import VueQrcode from '@chenfengyuan/vue-qrcode';

import App from './App';
import router from './router';
import store from './store';

Vue.use(iView);
Vue.use(VueBus);
Vue.component(VueQrcode.name, VueQrcode);

Vue.config.productionTip = false;

// request interceptor
axios.interceptors.request.use((config) => {
  const delimiter = config.url.indexOf('?') !== -1 ? '&' : '?';
  config.url += `${delimiter}_d=${Date.now()}`;
  // 修改数据提交格式为，form-data
  config.transformRequest = [data => qs.stringify(data)];
  return config;
}, (error) => {
  iView.Notice.error({
    title: '错误',
    desc: '请求失败，网络状况不佳',
  });
  return Promise.reject(error);
});

// response interceptor
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    // 直接请求md文件不过滤状态
    const url = response.config.url.split('?')[0];

    if (/\.md$/.test(url)) {
      return response.data;
    }

    if (response.data.code !== 0) { // 接口返回失败状态
      iView.Notice.error({
        title: '错误',
        desc: response.data.message,
      });
      return null;
    }
    return response.data; // 正常返回数据
  }
  return null;
}, (error) => {
  const status = error.response.status;
  iView.Notice.error({
    title: '错误',
    desc: status === 500 ? '服务处理请求失败！' : '请求失败，网络状况不佳',
  });
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
