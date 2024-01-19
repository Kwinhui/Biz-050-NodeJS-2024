document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("div.btn_box");

  btn_list.addEventListener("click", () => {
    location.href = "/book";
  });
});
