/*
 * @Author: codecook
 * @Date: 2017-11-15 14:57:00
 * @Last Modified by: codecook
 * @Last Modified time: 2017-11-16 09:46:55
 */
import axios from 'axios';

const Files = {
  /**
   * 文件列表
   * @param {*查询参数} query
   */
  list(query) {
    const params = Object.assign({
      page: -1,
      pageSize: 10,
      type: 'all',
    }, query);
    return axios.get('/file/list', { params });
  },
  /**
   * 删除文件
   */
  del(ids) {
    return axios.post('/file/del', { ids });
  },
};

export default Files;
