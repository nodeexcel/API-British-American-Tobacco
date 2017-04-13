import crypto from 'crypto'
import * as BaseProvider from './BaseProvider'

/* Provider for User Registration */
const create = (model, body, res) => {
  return new Promise((resolve, reject) => {
    if (!body.bat_id && !body.membership_number && !body.email && !body.password && !body.first_name && !body.last_name && !body.birthday && !body.membership_id && !body.outlet_name) {
      reject('All fields are Required')
    } else if (!body.bat_id) {
      reject('BAT ID is Required')
    } else if (!body.membership_number) {
      reject('Membership Number is Required')
    } else if (!body.password) {
      reject('Password is Required')
    } else if (!body.first_name) {
      reject('First Name is Required')
    } else if (!body.last_name) {
      reject('Last Name is Required')
    } else if (!body.birthday) {
      reject('Birthday is Required')
    } else if (!body.membership_id) {
      reject('Membership Type is Required')
    } else if (!body.outlet_name) {
      reject('Outlet Name is Required')
    } else {
      let date = new Date()
      let salt = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      let password = crypto.createHash('sha256').update(body.password + ':' + salt).digest('base64')
      resolve({ ...body, ...{ salt }, ...{ password } })
    }
  })
}

/* Provider for Outlet login */
const login = (model, body, salt) => {
  let password = crypto.createHash('sha256').update(body.password + ':' + salt).digest('base64')
  return { ...body, ...{ password } }
}

/* Provider for Outlet Update */
const updateOutlet = (model, body, res) => {
  let date = new Date()
  let salt = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let password = crypto.createHash('sha256').update(body.password + ':' + salt).digest('base64')
  return { ...body, ...{ password } }
}

export default {
  ...BaseProvider,
  create,
  login,
  updateOutlet
}
