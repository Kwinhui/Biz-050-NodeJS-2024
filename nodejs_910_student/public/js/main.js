document.addEventListener("DOMContentLoaded", () => {
  const div = document.querySelector("div.main");

  div.addEventListener("click", (e) => {
    const target = e.target;
    const classList = target.classList;
    if (classList.contains("item")) {
      let st_num = 0;
      if (classList.contains("ul")) {
        st_num = target.dataset.st_num;
      } else {
        st_num = target.closest("LI").dataset.st_num;
      }
      document.location.href = `/detail/${st_num}`;
    }
  });
});
