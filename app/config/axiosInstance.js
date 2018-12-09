import axios from 'axios';
import endpoints from './endpoints.json';

export default axios.create({
  baseURL: endpoints.API_ENDPOINT,
});
