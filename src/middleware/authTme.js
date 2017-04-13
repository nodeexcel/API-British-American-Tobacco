import moment from 'moment'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'
import config from '../config'
import db from '../db'

export class AuthController {
    // middleware for logged in users
  requiresLogin (req, res, next) {
    var token = req.param('accessToken')
    if (token) {
      jwt.verify(token, 'secret_key', function (err, docs) {
        if (err) {
          res.json(403, { msg: err })
        } else {
          var endTime = moment().unix()
          var loginTime = docs.exp
          if (loginTime > endTime) {
            req.token = docs.token
            db.Tme.find({ where: { id: req.token } })
                            .then(function (user) {
                              req.user = user
                              next()
                            })
          }
        }
      })
    } else {
      res.json(403, { msg: 'User Not Logged in' })
    }
  }
}

const controller = new AuthController()
export default controller
