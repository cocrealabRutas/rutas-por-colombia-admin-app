import axios from 'axios';
import endpoints from './endpoints';

export default axios.create({
  baseURL: endpoints.API_ENDPOINT,
});
