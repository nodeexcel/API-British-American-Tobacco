import admin from '../controllers/adminAccount'

export default (app) => {
    /* Route for User Registration  */
  app.route('/admin/register').post(admin.create)

    /* Route for User Login  */
  app.route('/admin/login').post(admin.adminLogin)

  return app
}
