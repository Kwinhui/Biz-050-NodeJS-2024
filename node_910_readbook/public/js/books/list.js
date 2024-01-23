document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.books tbody");
  table.addEventListener("click", (e) => {
    // target은 td tag
    const target = e.target;
    if (target.tagName === "TD") {
      const parTr = target.closest("TR");
      // click 된 TD 의 부모 TR 을 selector 해라
      const isbn = parTr.dataset.isbn;
      //   alert(isbn);

      // 변수
      // document.location.href = `/books/${isbn}/detail`;
      // 뒤로가기 화면 삭제 함수 replace
      document.location.replace(`/books/${isbn}/detail`);
    }
  });
});
