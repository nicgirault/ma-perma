import axios from 'axios'

import config from '../config'

export const getById = (id) => {
  return axios({
    url: `${config.API_URL}/variety/${id}`,
    method: 'GET'
  }).then((response) => response.data)
}

export const create = (variety) => {
  return axios({
    url: `${config.API_URL}/variety`,
    method: 'POST',
    data: variety
  })
}
