import axios from 'axios'

import config from '../config'

export const get = () => {
  return axios({
    url: `${config.API_URL}/vegetable`,
    method: 'GET'
  }).then((response) => response.data)
}

export const getById = (id) => {
  return axios({
    url: `${config.API_URL}/vegetable/${id}`,
    method: 'GET'
  }).then((response) => response.data)
}

export const create = (vegetable) => {
  return axios({
    url: `${config.API_URL}/vegetable`,
    method: 'POST',
    data: vegetable
  })
}
