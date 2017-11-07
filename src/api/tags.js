import axios from 'axios';

const Tags = {
  list(query) {
    const params = Object.assign({
      page: 0,
      pageSize: 10,
    }, query);
    return axios.get('/blog/tag/list', { params });
  },
  add(data) {
    return axios.post('/blog/tag/add', data);
  },
  update(data) {
    return axios.post('/blog/tag/update', data);
  },
  del(ids) {
    return axios.post('/blog/tag/del', {
      ids,
    });
  },
};

export default Tags;
