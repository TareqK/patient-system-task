import axios from 'axios';
axios.defaults.withCredentials = true


export const ApiService =  axios.create({
  baseURL: `https://localhost:5001/api`
});

ApiService.interceptors.response.use(function (response) {
  console.log(response);
  return response;
}, function (error) {
  console.log(error)
  window.history.pushState(null,null,"/sign-in")
  return Promise.reject(error);
});

export default ApiService