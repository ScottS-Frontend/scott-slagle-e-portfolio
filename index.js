let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault(event);
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_meetweg",
      "template_jygyeph",
      event.target,
      "RJthz35oIiV7VG5Ey",
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at scottslaglebusiness@gmail.com",
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

// Toggle project overlay on tap/click for mobile
document.querySelectorAll(".project__wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    // Close other open projects first (optional — remove if you want multiple open)
    document.querySelectorAll(".project__wrapper").forEach((other) => {
      if (other !== wrapper) {
        other.classList.remove("tapped");
      }
    });

    // Toggle current project
    wrapper.classList.toggle("tapped");
  });
});

function showResumeMessage(event) {
  event.preventDefault();
  alert("Resume coming soon! Check back later.");
}
