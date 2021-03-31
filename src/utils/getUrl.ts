import qs from 'query-string';
import { API } from '../constants';

const getUrl = (endpoint: API, params?: Record<string, any>) => {
  const query = params ? qs.stringify(params) : undefined;

  return `${process.env.API_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

export default getUrl;
