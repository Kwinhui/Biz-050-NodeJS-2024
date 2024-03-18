import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_subject extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    su_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    su_name: {
      type: DataTypes.STRING(8),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_subject',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "su_code" },
        ]
      },
    ]
  });
  }
}
