import _sequelize from "sequelize";
const { Model } = _sequelize;

export default class tbl_student extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        st_num: {
          type: DataTypes.STRING(10),
          allowNull: false,
          primaryKey: true,
        },
        st_name: {
          type: DataTypes.STRING(8),
          allowNull: false,
        },
        st_dept: {
          type: DataTypes.STRING(8),
          allowNull: false,
        },
        st_grade: {
          type: DataTypes.STRING(3),
          allowNull: false,
        },
        st_tel: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        st_addr: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_student",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "st_num" }],
          },
        ],
      }
    );
  }
}
