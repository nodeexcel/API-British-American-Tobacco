export default function (sequelize, DataTypes) {
  const outletAccount = sequelize.define('Outlet_Account', {
    membership_number: DataTypes.INTEGER,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mobile: DataTypes.BIGINT,
    birthday: DataTypes.DATE,
    last_access_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    freezeTableName: true,

    classMethods: {
      getAllOutlets (page, limit, offset) {
        return new Promise((resolve, reject) => {
          if (page == -1) {
            this.findAll({ order: '`id` DESC' })
                            .then((data) => {
                              resolve(data)
                            })
          } else if (page > 0) {
            this.findAll({
              offset,
              limit
            })
                            .then((data) => {
                              resolve(data)
                            })
          } else {
            throw new Error(reject('Invalid Page Number'))
          }
        })
      }
    },
    associate: (models) => {
      outletAccount.hasOne(models.Outlet, { foreignKey: 'outlet_id' })
    }
  })
  return outletAccount
}
