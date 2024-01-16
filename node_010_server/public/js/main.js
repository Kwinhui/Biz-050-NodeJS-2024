document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello Korea");
  const nav_ul = document.querySelector("nav ul");
  nav_ul.addEventListener("click", (event) => {
    // li tag
    const target = event.target;
    if (target.tagName === "LI") {
      // li tag가 클릭이 되면
      const className = target.className;
      if (className === "home") {
        document.location.href = "/";
      } else if (className === "join") {
        document.location.href = "/users";
      }
    }
  });
});
