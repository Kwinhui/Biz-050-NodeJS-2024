import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_code from "./tbl_code.js";
import _tbl_student from "./tbl_student.js";
import _tbl_subject from "./tbl_subject.js";

export default function initModels(sequelize) {
  const tbl_code = _tbl_code.init(sequelize, DataTypes);
  const tbl_student = _tbl_student.init(sequelize, DataTypes);
  const tbl_subject = _tbl_subject.init(sequelize, DataTypes);

  tbl_student.belongsToMany(tbl_subject, { as: "subject", through: tbl_code, foreignKey: "r_stcode", otherKey: "r_sucode" });
  tbl_subject.belongsToMany(tbl_student, { as: "r_stcode_tbl_students", through: tbl_code, foreignKey: "r_sucode", otherKey: "r_stcode" });
  tbl_code.belongsTo(tbl_student, { as: "r_학생", foreignKey: "r_stcode" });
  tbl_student.hasMany(tbl_code, { as: "tbl_codes", foreignKey: "r_stcode" });
  tbl_code.belongsTo(tbl_subject, { as: "r_과목", foreignKey: "r_sucode" });
  tbl_subject.hasMany(tbl_code, { as: "tbl_codes", foreignKey: "r_sucode" });

  return {
    tbl_code,
    tbl_student,
    tbl_subject,
  };
}
