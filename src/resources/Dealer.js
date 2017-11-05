import axios from 'axios'

import config from '../config'

export const create = (dealer) => {
  return axios({
    url: `${config.API_URL}/dealer`,
    method: 'POST',
    data: dealer
  })
}
