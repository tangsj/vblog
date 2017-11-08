/*
 * @Author: codecook
 * @Date: 2017-11-08 14:37:40
 * @Last Modified by: codecook
 * @Last Modified time: 2017-11-08 15:49:36
 */
import axios from 'axios';

const Posts = {
  /**
   * 获取所有md文件列表
   */
  fileList() {
    return axios.get('/static/posts.json');
  },
  /**
   * 文章列表
   * @param {*查询参数} query
   */
  list(query) {
    const params = Object.assign({
      page: 0,
      pageSize: 10,
    }, query);
    return axios.get('/blog/posts/list', { params });
  },
  /**
   * 添加文章
   * @param {*} data
   */
  add(data) {
    return axios.post('/blog/posts/add', data);
  },
  /**
   * 更新文章
   * @param {*} data
   */
  update(data) {
    return axios.post('/blog/posts/update', data);
  },
  /**
   * 获取文章详情
   */
  getById(id) {
    return axios.get(`/blog/posts/${id}`);
  },
};

export default Posts;
