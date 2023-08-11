import axios from 'axios';

export default axios.create({
  //baseURL: 'http://localhost:8080/api/v1/restaurants',
  baseURL: '/api/v1/restaurants',
});
