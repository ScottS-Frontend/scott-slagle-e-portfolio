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
  event.preventDefault();

  const form = event.target;
  const name = form.user_name.value.trim();
  const email = form.user_email.value.trim();
  const message = form.message.value.trim();

  // Validation checks
  if (!name) {
    alert("Please enter your name.");
    form.user_name.focus();
    return;
  }

  if (!email) {
    alert("Please enter your email.");
    form.user_email.focus();
    return;
  }

  // Simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    form.user_email.focus();
    return;
  }

  if (!message) {
    alert("Please enter a message.");
    form.message.focus();
    return;
  }

  // All good — send the email
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  
  loading.classList.add("modal__overlay--visible");
  
  emailjs
    .sendForm(
      "service_meetweg",
      "template_jygyeph",
      form,
      "RJthz35oIiV7VG5Ey"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
      form.reset(); // Clear the form after success
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly at scottslaglebusiness@gmail.com"
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
