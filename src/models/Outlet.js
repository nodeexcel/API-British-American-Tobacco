import db from '../db'
import async from 'async'

export default function (sequelize, DataTypes) {
  const Outlet = sequelize.define('Outlet', {
    outlet_id : {
      type          : DataTypes.INTEGER,
      references    : 'Outlet_Account',
      referencesKey : 'id'
    },
    tme_id : {
      type          : DataTypes.INTEGER,
      references    : 'TME_Account',
      referencesKey : 'id'
    },
    membership_id : {
      type          : DataTypes.INTEGER,
      references    : 'Membership_Type',
      referencesKey : 'id'
    },
    bat_id : {
      type      : DataTypes.STRING,
      allowNull : true,
      unique    : true
    },
    outlet_name  : DataTypes.STRING,
    points_value : {
      type         : DataTypes.INTEGER,
      defaultValue : 0
    },
    points_expiration_date : DataTypes.DATE,
    rebate_rate            : DataTypes.INTEGER
  }, {
    timestamps      : true,
    freezeTableName : true,
    allowNULL       : true,

    classMethods : {
      getAllOutlets (page, limit, offset) {
        return new Promise((resolve, reject) => {
          if (page == -1) {
            this.findAll({
              order   : '`id` DESC',
              include : [ {
                model    : sequelize.import('OutletAccount'),
                required : true
              } ]
            })
                            .then((data) => {
                              if (!data) {
                                reject(data)
                              } else {
                                const outlet = []
                                let count = data.length
                                async.each(data, (item, err) => {
                                  sequelize.import('TmeAccount').find({ where: { id: item.tme_id } })
                                            .then((docs) => {
                                              const details = {
                                                data : item,
                                                tme  : docs
                                              }
                                              outlet.push(details)
                                              count--
                                              if (count == 0) {
                                                resolve(outlet)
                                              }
                                            })
                                })
                              }
                            })
          } else if (page > 0) {
            this.findAll({
              offset,
              limit,
              order   : '`id` DESC',
              include : [ {
                model    : sequelize.import('OutletAccount'),
                required : true
              } ]
            })
                            .then((data) => {
                              if (!data) {
                                reject(data)
                              } else {
                                const outlet = []
                                let count = data.length
                                async.each(data, (item, err) => {
                                  sequelize.import('TmeAccount').find({ where: { id: item.tme_id } })
                                            .then((docs) => {
                                              const details = {
                                                data : item,
                                                tme  : docs
                                              }
                                              outlet.push(details)
                                              count--
                                              if (count == 0) {
                                                resolve(outlet)
                                              }
                                            })
                                })
                              }
                            })
          } else {
            throw new Error(reject('Invalid Page Number'))
          }
        })
      },

            // get Sku by id...
      getOutletById (id) {
        return new Promise((resolve, reject) => {
          this.findById(id, {
            include: [{
              model: sequelize.import('OutletAccount'),
              required: true
            }, {
              model: sequelize.import('Membership'),
              required: true
            }]
          })
                        .then((data) => {
                          if (data == null) {
                            reject('Outlet data is not found')
                          } else {
                            resolve(data)
                          }
                        })
        })
      },

      assignOutlet (id, tmeid) {
        return new Promise((resolve, reject) => {
          this.update({ tme_id: tmeid }, { where: { id } })
                        .then((data) => {
                          if (data != 0) {
                            resolve({
                              status  : 1,
                              message : 'Outlet Assigned'
                            })
                          } else {
                            resolve({
                              status : 0,
                              error  : 'Invalid Outlet Id'
                            })
                          }
                        })
                        .catch((err) => {
                          if (err) {
                            resolve({
                              status : 0,
                              error  : 'Invalid Tme Id'
                            })
                          }
                        })
        })
      },

            // get outlet by tme
      getOutletByTme (id) {
        return new Promise((resolve, reject) => {
          this.findAll({ where: { tme_id: id } })
                        .then((data) => {
                          if (data) {
                            resolve(data)
                          } else {
                            reject('No Outlet Data Found')
                          }
                        })
        })
      }
    },

    associate : (models) => {
      Outlet.belongsTo(models.Tme, { foreignKey: 'tme_id' })
      Outlet.belongsTo(models.Membership, { foreignKey: 'membership_id' })
      Outlet.belongsTo(models.outletAccount, { foreignKey: 'outlet_id' })
      Outlet.hasOne(models.Sales_order, { foreignKey: 'outlet_id' })
      Outlet.hasOne(models.Sales_return, { foreignKey: 'outlet_id' })
    }
  })

  return Outlet
}
