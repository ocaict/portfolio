const menu = document.querySelector(".menu");
const menuButtons = menu.querySelectorAll("a");

menuButtons.forEach((menuBtn) => {
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuButtons.forEach((btn) => btn.classList.remove("active"));
    menuBtn.classList.add("active");
    location.href = e.target.href;
    hideMenu();
  });
});

function hideMenu() {
  const menuBTn = document.querySelector("#menu-btn");
  menuBTn.checked = false;
}
