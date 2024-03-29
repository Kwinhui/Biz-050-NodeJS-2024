document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.input");
  const section = document.querySelector("section");
  const head = document.querySelector("input.head");
  const input = document.querySelector("button.input");
  const aside = document.querySelector("aside");
  const list = document.querySelector("div.body");
  btn?.addEventListener("click", () => {
    // section.style.display = "block";
    // aside.style.borderRight = "1px solid #aaa";
    // head.focus();
    // input.submit();
    document.location.href = "/input";
  });
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = modifyNumber(today.getHours());
  const min = modifyNumber(today.getMinutes());
  const sec = modifyNumber(today.getSeconds());
  const formatDate = year + "." + ("00" + month.toString()).slice(-2) + "." + ("00" + day.toString()).slice(-2);
  document.getElementById("date").innerHTML = formatDate;
  document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
  function modifyNumber(time) {
    if (parseInt(time) < 10) {
      return "0" + time;
    } else return time;
  }
  list?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "SPAN") {
      const par = target.closest("DIV");
      const m_seq = par.dataset.m_seq;

      document.location.href = `${m_seq}/detail`;
    }
    // if (target.tagName === "TD") {
    //   const tr = target.closest("TR");
    //   const p_code = tr.dataset.pcode;
    // document.location.href = "/detail";
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
  const input_img = document.querySelector("#m_image");
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
    const input_image = document.querySelector("#m_image");
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
