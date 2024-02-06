document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");
  console.log(pro_table);
  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      console.log(p_code);
      // 클릭이 되면 상품코드 가져와
      document.location.replace(`/products/${p_code}/detail2`);
    }
  });
  const addBtn = document.querySelector("button.add");
  addBtn.addEventListener("click", () => {
    document.location.replace("/products/insert");
  });
});
