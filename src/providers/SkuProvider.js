import crypto from 'crypto'
import * as BaseProvider from './BaseProvider'

/* Provider for User Registration */
const create = (model, body, res) => {
  return new Promise((resolve, reject) => {
    if (!body.brand_id && !body.productname && !body.bat_id && !body.skumax && !body.basepoint) {
      reject('All fields are Required')
    } else if (!body.brand_id) {
      reject('Brand Id  is Required')
    } else if (!body.productname) {
      reject('Product Name  is Required')
    } else if (!body.bat_id) {
      reject('BAT ID is Required')
    } else if (!body.skumax) {
      reject('Sku Max is Required')
    } else if (!body.basepoint) {
      reject('BasePoint is Required')
    } else {
      resolve({ ...body })
    }
  })
}

export default {
  ...BaseProvider,
  create
}
