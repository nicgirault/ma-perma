import axios from 'axios'

import config from '../config'

export const get = () => {
  return axios({
    url: `${config.API_URL}/flower`,
    method: 'GET'
  }).then((response) => response.data)
}

export const getById = (id) => {
  return axios({
    url: `${config.API_URL}/flower/${id}`,
    method: 'GET'
  }).then((response) => response.data)
}

export const create = (flower) => {
  return axios({
    url: `${config.API_URL}/flower`,
    method: 'POST',
    data: flower
  })
}
