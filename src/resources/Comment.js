import axios from 'axios'

import config from '../config'

export const create = (comment) => {
  return axios({
    url: `${config.API_URL}/comment`,
    method: 'POST',
    data: comment
  })
}
