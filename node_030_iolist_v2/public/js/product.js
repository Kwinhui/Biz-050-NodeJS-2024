document.addEventListener("DOMContentLoaded", () => {
  const TH_ITEMS = {
    상품코드: "p_code",
    상품이름: "p_name",
    품목: "p_item",
    규격: "p_std",
    매입단가: "p_iprice",
    매출단가: "p_oprice",
  };
  const url = new URL(document.location.href);
  // href : 현재 화면이 열릴때 서버에 요청한 주소창의 값들
  // href 값에 일부를 추출하거나, 값을 가공하기 위하여 사용
  // 주소창에 sort라는 값이 있으면 그 값을 가져와
  const sort = url.searchParams.get("sort");

  // 주소창에 order라는 값이 있으면 그 값을 가져와
  const order = url.searchParams.get("order");

  const pro_table = document.querySelector("table.products");
  /**
   * table.products 선택자는 상품리스트 화면에서는 유효한 선택자 이다.
   * 하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다.
   * detail, insert 화면 등에서는 pro_table 객체가 null  인 상태가 된다는 것이다.
   * pro_table 객체가 null 인 상태일때, .add() 등의 method 를 실행하면
   * null pointer exception 이 발생하고, HTML JS 에서는 이후의 JS 코드가 모두
   * 무력화 된다(실행이 안됨).
   *
   * 그래서 pro_table 객체가 null 일때는 다른 동작을 건너 뛰도록 해주어야 한다.
   * 이때 사용하는 기호가 "객체?" 이다. 이러한 코드를 null safe 코드 라고 한다.
   */
  console.log(pro_table);
  pro_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      console.log(p_code);
      // 클릭이 되면 상품코드 가져와
      document.location.replace(`/products/${p_code}/detail`);
      // 현재 click 된 요소가 TH 이거나 TH 의 자손이면
    } else if (target.tagName === "TH" || target.closest("TH")) {
      const text = target.innerText || target.closest("TH").innerText;
      // alert(text);
      const sortColumn = TH_ITEMS[text.trim()];

      url.searchParams.set("order", order === "ASC" ? "DESC" : "ASC");
      // 주소창 , 선택
      // 주소창의 sort 선택 요소와 클릭한 선택 요소가 다르면
      // 무조건 ASC 로 초기화 하여라
      sort != sortColumn && url.searchParams.set("order", "ASC");

      // http://localhost:3000/products/?p_search=%EC%B4%88%EC%BD%94
      // url중에서 searchParam(또는 queryString) 들만 추출하기  ? 뒤의 값들

      // sortColumn 이 Null 이 아닌 경우만 sort 변수를 세팅
      // null safe 코드
      sortColumn && url.searchParams.set("sort", sortColumn);
      // order랑 sort 값을 set(추가) 해서 ASC, sortColumn 값을 추가
      document.location.replace(`/products?${url.searchParams.toString()}`);

      // .trim() whitepsace 제거
      // let sort = "p_code"
      // if(text === "상품코드") {
      //   sort = "p_code"
      // } else if (text === "상품이름") {
      //   sort = "p_name"
      // }
      // alert(sortColumn);
    } // end else - if
    // http://localhost:3000/products?order=ASC&sort=p_code
  }); // end event

  // DOMContentLoaded event 가 실행될때 마다 실행
  // "span.p_code"
  const span_sort = document.querySelector(`span.${sort}`);
  const icon = span_sort.querySelector("i.arrow");
  // i tag
  span_sort.classList.add("sort");
  icon.classList.add(order === "ASC" ? "up" : "down");

  // const addBtn = document.querySelector("#btn_insert");
  // addBtn.addEventListener("click", () => {
  //   document.location.replace("/products/insert");
  // });
});

// DOMContentLoaded 가 여러번 나올 수 있음
document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_insert");
  // list 파일에선 오류가 나지 않지만 detail 화면에선 NullpointerException
  // 오류가 날 수 있기 때문에 ? 붙여줌
  btn_insert?.addEventListener("click", () => {
    document.location.replace("/products/insert");
  });
});

const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  // input(type =file) 은 여러개의 파일을 선택(담기)할수 있다.
  // 현재는 한개의 파일만 선택하므로
  // 0 번째 파일만 추출하여 사용한다.
  const file = event.target.files[0];
  const fileReader = new FileReader();
  // 파일을 읽었으면 할일 미리 지정하기(event handler)
  fileReader.onload = (e) => {
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  // storage 에서 파일을 읽어라 라는 지시
  // 지시를 받고 비동기적으로 파일을 읽기 시작
  // 파일이 모두 읽혀 지면 onload 이벤트를 발생시킨다.
  fileReader.readAsDataURL(file);
};

document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#p_image");
  const div_img = document.querySelector("div.img_box");
  const input_focus = document.querySelector("#img_focus");
  img_add?.addEventListener("click", () => {
    input_img.click();
  });
  input_img?.addEventListener("change", imagePreView);
  div_img?.addEventListener("click", () => {
    input_focus.focus();
  });

  div_img?.addEventListener("paste", async (e) => {
    const items = e.clipboardData.items;
    const item = items[0];
    const img_add = document.querySelector("img.img_add");
    const input_image = document.querySelector("#p_image");
    // item 의 type 의 인덱스가 image 가 아니면 붙이지마
    if (item.type.indexOf("image") === 0) {
      // 그 친구를 파일로 변환
      const blob = item.getAsFile();
      if (!blob) return false;

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileURL = event.target.result;
        img_add.src = fileURL;
      };
      fileReader.readAsDataURL(blob);
      // 복사 붙이기 한 파일을 input(type=file) tag 에 포함하기
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(blob);
      input_image.files = dataTransfer.files;
    }
  });
});
