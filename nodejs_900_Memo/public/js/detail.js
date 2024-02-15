document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.list");
  const btn_update = document.querySelector("button.update");
  const btn_delete = document.querySelector("button.delete");

  btn_list.addEventListener("click", () => {
    document.location.href = "/";
  });
  btn_update.addEventListener("click", (e) => {
    document.location.href = `/${e.target.dataset.m_seq}/update`;
  });
  btn_delete.addEventListener("click", (e) => {
    if (confirm("정말 삭제할까요?")) {
      document.location.replace(`/${e.target.dataset.m_seq}/delete`);
    }
  });
});
