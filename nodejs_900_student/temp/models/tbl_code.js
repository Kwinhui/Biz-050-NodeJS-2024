import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_code extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    r_stcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tbl_student',
        key: 'st_num'
      }
    },
    r_sucode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tbl_subject',
        key: 'su_code'
      }
    },
    r_score: {
      type: DataTypes.STRING(3),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_code',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "r_stcode" },
          { name: "r_sucode" },
        ]
      },
      {
        name: "fk_sucode",
        using: "BTREE",
        fields: [
          { name: "r_sucode" },
        ]
      },
    ]
  });
  }
}
