document.addEventListener("DOMContentLoaded", () => {
  const student = document.querySelector("table.student");
  const subject = document.querySelector("aside.right");
  const num = subject.querySelector("li[value='st_num']");
  const name = subject.querySelector("li[value='st_name']");
  const dept = subject.querySelector("li[value='st_dept']");
  const grade = subject.querySelector("li[value='st_grade']");
  const tel = subject.querySelector("li[value='st_tel']");
  const addr = subject.querySelector("li[value='st_addr']");
  const sub = subject.querySelector("table.subject tbody");

  student.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      subject.style.display = "flex";
      let st_num = 0;
      const partr = target.closest("TR");
      st_num = partr.dataset.st_num;

      const res = await fetch(`/${st_num}/detail`);
      const json = await res.json();
      console.log(json);

      num.textContent = `학번: ${json.st_num}`;
      name.textContent = `이름: ${json.st_name}`;
      dept.textContent = `학과: ${json.st_dept}`;
      grade.textContent = `학년: ${json.st_grade}`;
      tel.textContent = `전화번호: ${json.st_tel}`;
      addr.textContent = `주소: ${json.st_addr}`;

      sub.innerHTML = "";

      json.tbl_codes.forEach(async (code) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdScore = document.createElement("td");

        const res = await fetch(`/subject/${code.r_sucode}`);
        const json = await res.json();
        const subjectName = json.su_name;

        tdName.textContent = subjectName;
        tdScore.textContent = code.r_score;

        tr.appendChild(tdName);
        tr.appendChild(tdScore);
        sub.appendChild(tr);
      });
    }
  });
});
