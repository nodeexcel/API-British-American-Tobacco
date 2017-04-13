export default function (sequelize, DataTypes) {
  const Admin = sequelize.define('Admin_Account', {
    first_name : DataTypes.STRING,
    last_name  : DataTypes.STRING,
    email      : {
      type   : DataTypes.STRING,
      unique : true
    },
    password         : DataTypes.STRING,
    salt             : DataTypes.STRING,
    last_access_date : {
      type      : DataTypes.DATE,
      allowNull : true
    }
  }, {
    timestamps      : true,
    freezeTableName : true
  })
  return Admin
}
