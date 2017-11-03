import axios from 'axios'

import config from '../config'

export const create = (flowerAId, flowerBId, type) => {
  return axios({
    url: `${config.API_URL}/relation`,
    method: 'POST',
    data: { flowerAId, flowerBId, type }
  })
}
