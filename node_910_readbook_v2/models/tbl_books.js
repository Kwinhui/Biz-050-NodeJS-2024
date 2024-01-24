import sequelize from "sequelize";

// seq : sequelize 도구에서 제공하는 data 객체 생성 도구
const books = (seq) => {
  const book_table = {
    isbn: {
      type: sequelize.DataTypes.STRING(13),
      primaryKey: true,
    },
    title: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false,
      // NOT NULL
    },
    author: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false,
    },
    publisher: {
      type: sequelize.DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: sequelize.DataTypes.INTEGER,
    },
    discount: {
      type: sequelize.DataTypes.INTEGER,
    },
  };

  const seq_init = {
    sequelize: seq,
    tableName: "tbl_books",
  };
  return seq.define("tbl_books", book_table, seq_init);
  // 객체로 선언 후 프로젝트가 실행되면 tbl_books 가 자동으로 생성됨
  // workbench에서 만들 필요 없이
};
export default books;
