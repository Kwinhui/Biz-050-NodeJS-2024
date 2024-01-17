document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.student.list");
  table?.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      // 클릭된 target(TD)을 감싸고있는 가장 가까운 부모
      const paTR = target.closest("TR");
      // TR로부터 TD 리스트를 가져와라
      const tds = paTR.querySelectorAll("TD");
      // 1번칸에 있는 데이터를 가져와라
      const st_num = tds[1].innerText;
      //   alert(st_num);

      document.location.href = `/student/${st_num}/detail`;
    }
  });
});
