document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.book.list");
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const td = tr.querySelectorAll("TD");
      const bk_isbn = td[1].innerText;
      document.location.href = `/book/${bk_isbn}/detail`;
    }
  });
});
