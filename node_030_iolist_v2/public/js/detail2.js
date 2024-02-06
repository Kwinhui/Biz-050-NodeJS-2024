document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("div.content");
  list.addEventListener("click", (e) => {
    const target = e.target;
    const p_code = target.dataset.pcode;

    // console.log(p_code);
    // document.location.href = `/products/${p_code}/detail2`;
  });
});
