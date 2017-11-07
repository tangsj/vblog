import axios from 'axios';

const Posts = {
  list() {
    return axios.get('/static/posts.json');
  },
};

export default Posts;
