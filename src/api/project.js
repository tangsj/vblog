/*
 * @Author: codecook
 * @Date: 2017-11-08 14:38:25
 * @Last Modified by: codecook
 * @Last Modified time: 2017-11-08 14:38:45
 */

import axios from 'axios';

const Project = {
  /**
   * 获取项目经验列表
   */
  list() {
    return axios.get('/static/project.json');
  },
};

export default Project;
