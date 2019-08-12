import axios from 'axios';
import endpoints from './endpoints';
console.log(endpoints);
export default axios.create({
  baseURL: endpoints.API_ENDPOINT,
});
