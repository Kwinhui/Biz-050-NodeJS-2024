document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("table.iolist");
  list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const paTr = target.closest("TR");

      const d_code = paTr.dataset.dcode;
      document.location.href = `/products/${d_code}/detail`;
    }
  });
});
