import * as BaseProvider from './BaseProvider'

/* Provider for User Registration */
const create = (body, res) => {
  return new Promise((resolve, reject) => {
    if (!body.type_name && !body.rebate_rate && !body.order && !body.min_required_points) {
      reject('All fields are required')
    } else if (!body.type_name) {
      reject('Membership Type Is Required')
    } else if (!body.rebate_rate) {
      reject('Rebate Rate is required')
    } else if (!body.order) {
      reject('Order is required')
    } else if (!body.min_required_points) {
      reject('Minimum Point is required')
    } else {
      resolve({ ...body })
    }
  })
}

export default {
  ...BaseProvider,
  create
}
