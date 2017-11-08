/*
 * @Author: codecook
 * @Date: 2017-11-08 14:38:50
 * @Last Modified by: codecook
 * @Last Modified time: 2017-11-08 14:39:33
 */
import axios from 'axios';

const Tags = {
  /**
   * 标签列表
   * @param {*查询参数} query
   */
  list(query) {
    const params = Object.assign({
      page: 0,
      pageSize: 10,
    }, query);
    return axios.get('/blog/tag/list', { params });
  },
  /**
   * 添加标签
   */
  add(data) {
    return axios.post('/blog/tag/add', data);
  },
  /**
   * 更新标签
   */
  update(data) {
    return axios.post('/blog/tag/update', data);
  },
  /**
   * 删除标签
   */
  del(ids) {
    return axios.post('/blog/tag/del', {
      ids,
    });
  },
};

export default Tags;
