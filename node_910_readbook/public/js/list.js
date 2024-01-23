document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.books.list");
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const paTr = target.closest("TR");
      const tds = paTr.querySelectorAll("TD");
      const isbn = tds[0].innerText;
      //   alert(isbn);
      document.location.href = `/books/${isbn}/detail`;
    }
  });
});
