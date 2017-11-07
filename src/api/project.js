import axios from 'axios';

const Project = {
  list() {
    return axios.get('/static/project.json');
  },
};

export default Project;
