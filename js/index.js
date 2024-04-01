const menu = document.querySelector(".menu");
const menuButtons = menu.querySelectorAll("a");
const messageBox = document.querySelector(".message-container");
const submitBtn = document.querySelector(".submit-btn");
let classType;
const showMessage = (msg, type, time = 5000) => {
  classType = type;
  messageBox.innerHTML = `
  <p>${msg}</p>
  <i class="fas fa-times close-btn"></i>
  `;
  messageBox.classList.add(type);
  setTimeout(() => {
    messageBox.classList.remove(type);
    messageBox.innerHTML = "";
  }, time);
};

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
  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;
  const url = "https://ocawebtch-portfolio.onrender.com/contact";
  e.preventDefault();
  const formInputs = Array.from(form.querySelectorAll("input"));
  const messageInput = form.querySelector("textarea");
  formInputs.push(messageInput);

  const formData = {};
  formInputs.forEach((input) => {
    formData[input.name] = input.value;
  });

  formData.message = sanitizeMessage(formData.message);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      showMessage(
        `Hi ${result.user.name}, Your message has been submitted successfully. I will get in touch within 24 hours`,
        "success",
        20000
      );
      clearInputs(formInputs);
      submitBtn.textContent = "Let's Go";
      submitBtn.disabled = false;
    } else {
      showMessage(result.message, "warning");
      submitBtn.textContent = "Let's Go";
      submitBtn.disabled = false;
    }
  } catch (error) {
    submitBtn.textContent = "Let's Go";
    submitBtn.disabled = false;
    console.log(error);
    showMessage(error.message, "error");
  }
});

messageBox.addEventListener("click", (e) => {
  if (e.target.className.includes("close-btn")) {
    messageBox.classList.remove(classType);
  }
});
