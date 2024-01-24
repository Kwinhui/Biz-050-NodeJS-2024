import Sequelize from "sequelize";
const book = (sequelize) => {
  const book_table = {
    // book_table 이라는 객체안에 isbn의 객체
    isbn: {
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true,
      defaultValue: "",
      // PK 선언
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      // NOT NULL 선언
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      // NOT NULL 선언
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      // NOT NULL 선언
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  };
  return sequelize.define("tbl_books", book_table, {
    // 값3개받음 테이블이름, 테이블구조, seq설정
    // sequelize 라는 변수를 선언하고, book 함수에서 매개변수로 받은 sequelize 를
    // 값으로 세팅한다.
    // 단 선언하는 변수명과 세팅하는 값이 담긴 변수명이 같으면  값이 담긴 변수명을
    // 생략할 수 있다.
    // sequelize: sequelize, 이 명령문을 sequelize 만 사용해도 된다.
    sequelize,
    tableName: "tbl_books",
    timestamps: false,
  });
};

export default book;
