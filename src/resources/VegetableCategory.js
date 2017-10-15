import axios from 'axios'

import config from '../config'

export const find = () => {
  return axios({
    method: 'GET',
    url: `${config.API_URL}/vegetable/category`
  })
  .then((response) => response.data)
}
