document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");

  table.addEventListener("click", (event) => {
    const target = event.target;
    // target = td
    if (target.tagName === "TD") {
      // alert(target.innerText);
      const parentsTR = target.closest("TR");
      // 타겟으로부터 가장 가까이 있는 TR
      const tds = parentsTR.querySelectorAll("TD");
      // 그 친구가 가지고있는 TD 전체
      const st_num = tds[0].innerText;
      // 0번째 tds에 있는 글자 = 학번
      // alert(st_num);
      // href = "/student/" + st_num + "/detail"
      document.location.href = `/student/${st_num}/detail`;
    }
  });
});
