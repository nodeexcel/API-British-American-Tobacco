export default function (sequelize, DataTypes) {
  const Tme = sequelize.define('TME_Account', {
    bat_id : {
      type      : DataTypes.STRING,
      allowNull : true,
      unique    : true
    },
    password   : DataTypes.STRING,
    salt       : DataTypes.STRING,
    first_name : DataTypes.STRING,
    last_name  : DataTypes.STRING,
    email      : {
      type   : DataTypes.STRING,
      unique : true
    },
    mobile_no        : DataTypes.STRING,
    last_access_date : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    timestamps      : true,
    freezeTableName : true,

    classMethods : {
      getAllTme (page, limit, offset) {
        return new Promise((resolve, reject) => {
          if (page == -1) {
            this.findAll({ order: '`id` DESC' })
							.then((data) => {
  resolve(data)
})
          } else if (page > 0) {
            this.findAll({
              offset,
              limit })
								.then((data) => {
  resolve(data)
})
          } else {
            throw new Error(reject('Invalid Page Number'))
          }
        })
      }
    },
    associate : (models) => {
      Tme.hasOne(models.Outlet, { foreignKey: 'tme_id' })
    }
  })
  return Tme
}
