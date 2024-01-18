document.addEventListener("DOMContentLoaded", () => {
  const ST_INDEX = {
    ST_NUM: 0,
    ST_NAME: 1,
    ST_DEPT: 2,
  };
  const st_num_check = async (st_num) => {
    // 서버에 GET: /student/학번/check 로 요청하기
    // 서버에서 response 한 정보를 response 변수에 받기(저장)
    const response = await fetch(`/student/${st_num}/check`);
    // 여기있는 코드를 동기식으로 쓰겠다.
    // fetch : 현재 보고있는 화면을 그대로 유지하면서 서버와 통신
    //         비동기적으로

    // response 정보에서 json type 의 값(데이터)만 추출하여 json 에 저장
    // {result :"ERROR", message:""},
    // 또는 { result : "있다", STD:"학번"}
    // 또는 { result : "없다", STD: null }
    const json = await response.json();
    console.log(json);
    // json 데이터 중에서 result 변수만 추출하여 return
    // ERROR, 있다, 없다 중에 한가지를 return
    return json.result;
  };

  // const stnum = document.querySelector("input[name='st_num]");
  // id 부착x

  //   const st_num = document.querySelector("#st_num");
  //   // id를 부착 #st_num
  //   const st_name = document.querySelector("#st_name");
  //   const st_dept = document.querySelector("#st_dept");

  //   const btn_submit = document.querySelector("form.student button");
  const form = document.querySelector("form.student");

  //   const st_num = form.querySelector("#st_num");
  //   const st_name = form.querySelector("#st_name");
  //   const st_dept = form.querySelector("#st_dept");

  const btn_submit = form.querySelector("button");
  const inputs = form.querySelectorAll("input");
  const st_num = inputs[ST_INDEX.ST_NUM];
  const st_name = inputs[ST_INDEX.ST_NAME];
  const st_dept = inputs[ST_INDEX.ST_DEPT];

  // 여러개의 tag 묶음을 배열로 만들기
  const error_divs = document.querySelectorAll("div.student.error");

  const st_num_valid = async (target) => {
    // result 에는 ERROR, 있다, 없다 중의 한가지 문자열이 저장된다.
    const result = await st_num_check(target.value);
    let message = "";
    let color = "red";
    if (result === "ERROR") {
      message = " * DB 오류";
    } else if (result === "있다") {
      message = " * 이미 등록된 학번입니다.";
    } else if (result === "없다") {
      message = " * 사용가능한 학번 입니다.";
      color = "blue";
    }
    error_divs[ST_INDEX.ST_NUM].innerHTML = message;
    error_divs[ST_INDEX.ST_NUM].style.color = color;
    // if (color === "red") {
    //   st_num.select();
    //   return false;
    // }
    // return true;
    // color 값이 "red" 이면 true, 아니면 false return
    return color === "red";
  };

  /**
   * 먼저 btn_submit(button) 의 click event 를 최소한으로 테스트를 하고
   * 이후에 btn_submit null pointer exception 을 일으키는 현상을 방지하기 위하여
   * btn_submit? 형식으로 이후 코드를 사용한다.
   */
  btn_submit?.addEventListener("click", async () => {
    // 표시되었던 error 메시지를 모두 clear 하기
    error_divs.forEach((item) => (item.innerHTML = ""));
    // alert("전송");
    // 첫번째 inputbox에 입력한 값
    // st_num의 값이 비어있으면
    if (!st_num.value) {
      error_divs[ST_INDEX.ST_NUM].innerHTML = "* 학번은 반드시 입력하세요";
      st_num.select();
      return false;
    } else {
      const bRedYes = st_num_valid(st_num);
      if (!bRedYes) {
        st_num.select();
        return false;
      }
    }

    if (!st_name.value) {
      error_divs[ST_INDEX.ST_NAME].innerHTML = "* 학생의 이름은 반드시 입력해야 합니다";
      st_name.select();
      return false;
    }
    if (!st_dept.value) {
      error_divs[ST_INDEX.ST_DEPT].innerHTML = "* 학과는 반드시 입력하세요";
      st_dept.select();
      return false;
    }
    // 유효성검사를 마치면 서버로 데이터 보내기
    form.submit();
  });

  // 학번을 입력받는 input box 에 event 걸기
  /**
   * blur event
   * 보통은 input box 에서 사용하는 event
   * input box 에 foucs 가 있다가 다른 곳으로 focus() 이동하는 순간
   * 발생하는 event
   */
  let EVENT_ST_NUM = false;
  st_num?.addEventListener("blur", async (event) => {
    // "blur" 는 input.css 에 있는 focus가 끝나면 발생한다
    // "blur" 를 쓸땐 alert를 쓰면 안됨
    // const target = event.currentTarget;
    // div box 안에 button 이 있으면 target은 button이 되겠지만
    // currentTarget은 div box가 된다.
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_NUM].innerText = "* 학번을 입력해 주세요";
      // alert("학번은 반드시 입력하세요");
      target.select();
      return false;
    } else {
      if (bRedYes) {
        const bRedYes = await st_num_valid(target);
        target.select();
        return false;
      }
      // 학번이 입력이 됐으면 *학번을 입력해 주세요 문구를 초기화
      // error_divs[ST_INDEX.ST_NUM].innerText = "";
    }
    // ST_NUM 에서 유효성 검사가 모두 끝났다 라는 flag 변수
    EVENT_ST_NUM = true;
    // alert(value);
  });

  st_name.addEventListener("blur", (event) => {
    // ST_NUM 에서 유효성 검사가 끝나지 않았으면(false) 더 진행하지 말라
    if (!EVENT_ST_NUM) return false;

    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_NAME].innerText = " * 이름은 반드시 입력해야 합니다";
      st_name.select();
      return false;
    }
  });

  st_dept.addEventListener("blur", (event) => {
    if (!EVENT_ST_NUM) return false;
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[ST_INDEX.ST_DEPT].innerText = "* 학과를 입력해 주세요";
      target.select();
      return false;
    } else {
      error_divs[ST_INDEX.ST_DEPT].innerText = "";
    }
  });

  // 새로고침 했을때 자동으로 학번에 focus됨
  st_num.focus();
});
