document.addEventListener("DOMContentLoaded", () => {
  const BK_INDEX = {
    BK_ISBN: 0,
    BK_TITLE: 1,
    BK_AUTHOR: 2,
    BK_PUBLISHER: 3,
    BK_PRICE: 5,
    BK_DISCOUNT: 6,
  };
  const form = document.querySelector("form.book");
  const saveBtn = document.querySelector("#save");
  const newBtn = document.querySelector("#new");
  const listBtn = document.querySelector("#list");

  const inputs = form.querySelectorAll("input");
  const isbn = inputs[BK_INDEX.BK_ISBN];
  const title = inputs[BK_INDEX.BK_TITLE];
  const author = inputs[BK_INDEX.BK_AUTHOR];
  const publisher = inputs[BK_INDEX.BK_PUBLISHER];
  const price = inputs[BK_INDEX.BK_PRICE];
  const discount = inputs[BK_INDEX.BK_DISCOUNT];
  const error_divs = document.querySelectorAll("div.input.error");
  saveBtn?.addEventListener("click", (e) => {
    error_divs.forEach((item) => (item.innerHTML = ""));

    if (!isbn.value) {
      error_divs[BK_INDEX.BK_ISBN].innerHTML = " * ISBN을 입력해주세요";
      console.log(isbn.value);
      isbn.select();
      return false;
    }
    if (!title.value) {
      error_divs[BK_INDEX.BK_TITLE].innerHTML = " * 도서명을 입력해주세요";
      title.select();
      return false;
    }

    form.submit();
  });
});
