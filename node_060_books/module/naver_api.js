import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_BOOK_URL } from "../config/naver_secret.js";

const getBooks = async (search) => {
  // naver 에 데이터 요청하기 위한 준비
  const naverFetchOption = {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };
  let queryString = `${NAVER_BOOK_URL}?query=${search}&display=1`;
  let response = null;
  try {
    response = await fetch(queryString, naverFetchOption);
    let count = (await response.json()).total;

    count = count > 100 ? 100 : count;

    queryString = `${NAVER_BOOK_URL}?query=${search}&display=${count}`;

    response = await fetch(queryString, naverFetchOption);
    return (await response.json()).items;
  } catch (error) {
    // catch 가 실행되었다 = naver 에서 오류메시지 보냈다.

    // throw : 나를 호출한(roter) 곳으로 exception 을 전달하라.
    // 새로운 오류메시지를 만들어서 전달하라.
    console.log(error);
    throw new Error("Naver 통신 오류");
  }
};

export { getBooks };
