import axios from 'axios'

import config from '../config'

export const create = (vegetableAId, vegetableBId, isPositive) => {
  return axios({
    url: `${config.API_URL}/vegetable/${vegetableAId}/association`,
    method: 'POST',
    data: {
      vegetableIdToAssociate: vegetableBId,
      isPositive: isPositive
    }
  })
}
