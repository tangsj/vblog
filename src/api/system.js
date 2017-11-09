/*
 * @Author: codecook
 * @Date: 2017-11-09 15:43:51
 * @Last Modified by: codecook
 * @Last Modified time: 2017-11-09 15:54:34
 */
import axios from 'axios';

const System = {
  /**
   * 登录
   */
  doLogin(data) {
    return axios.post('/blog/login', data);
  },
  /**
   * 退出
   */
  doLogout() {
    return axios.post('/blog/logout');
  },
};

export default System;
