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

const form = document.querySelector(".form");
const sendMessage = () => {};

const sanitizeMessage = (message) => {
  const htmlRegex = /<[^>]*>/g;
  return message.replace(htmlRegex, "");
};
const clearInputs = (inputs) => {
  inputs.forEach((input) => {
    input.value = "";
  });
};

form.addEventListener("submit", async (e) => {
  const url = "http://localhost:3600/contact";
  e.preventDefault();
  const formInputs = Array.from(form.querySelectorAll("input"));
  const messageInput = form.querySelector("textarea");
  formInputs.push(messageInput);

  const formData = {};
  formInputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  formData.message = sanitizeMessage(formData.message);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Server not Reached");
  }
  const result = await res.json();
  clearInputs(formInputs);
  console.log(result);
});
