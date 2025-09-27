document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".threedot");
  const aside = document.querySelector(".aside");
  const closeBtn = document.querySelector(".closeBtn");

  menuBtn.addEventListener("click", () => {
    aside.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    aside.classList.remove("active");
  });

  let currentIndex = 0;
  const slides = document.getElementById("slides");
  const totalSlides = document.querySelectorAll(".slide").length;

  function updateSlide() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }, 3000);

  const slider = document.querySelector(".slider");
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    }, 3000);
  });

  const okay = document.querySelector(".submit-button");
  const community = document.querySelector(".join");
  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  okay.addEventListener("click", (event) => {
    event.preventDefault();
    const emailInput = document.querySelector(".email-input");
    const emailContainer = document.querySelector(".email-container");

    let oldError = document.querySelector(".error-message");
    if (oldError) oldError.remove();

    if (emailInput.value === "") {
      let error = document.createElement("p");
      error.textContent = "Please enter your email.";
      error.classList.add("error-message");
      emailContainer.appendChild(error);
    } else if (!emailpattern.test(emailInput.value)) {
      let error = document.createElement("p");
      error.textContent = "Please enter a valid email.";
      error.classList.add("error-message");
      emailContainer.appendChild(error);
    } else {
      let para = document.createElement("p");
      para.textContent = "Thank you for joining our community :)";
      community.innerHTML = "";
      community.appendChild(para);
    }
  });
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // if (!name || !email || !message) {
  //  alert("Please fill in all fields.");
  //  return;
  //  }

  contactForm.innerHTML =
    "<p>Thank you for contacting us. We will get back to you soon!</p>";

});
