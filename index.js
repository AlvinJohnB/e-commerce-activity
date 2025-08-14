function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification alert alert-${type} d-flex align-items-center`;
  notification.innerHTML = `
                <i class="fas fa-check-circle me-3" style="font-size: 1.2rem;"></i>
                <div class="flex-grow-1">
                    <strong>${message}</strong>
          
                </div>
                <button type="button" class="btn-close ms-3" onclick="this.parentElement.remove()"></button>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideInRight 0.5s reverse";
      setTimeout(() => notification.remove(), 500);
    }
  }, 4000);
}

// Enhanced smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Enhanced navbar scroll effect
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
  }

  // Hide/show navbar on scroll
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScrollTop = scrollTop;
});

// Enhanced carousel with auto-play control
document.addEventListener("DOMContentLoaded", function () {
  const carousel = new bootstrap.Carousel(
    document.getElementById("modernCarousel"),
    {
      interval: 3000,
      wrap: true,
      pause: "hover",
    }
  );

  // Pause carousel when user interacts with page
  let userInteracted = false;
  document.addEventListener("click", () => {
    if (!userInteracted) {
      userInteracted = true;
      carousel.cycle();
    }
  });
});

// Search functionality
document.querySelector(".search-btn").addEventListener("click", function () {
  const searchTerm = document.querySelector(".search-input").value;
  if (searchTerm.trim()) {
    showNotification(`Searching for "${searchTerm}"...`, "info");
  }
});

document
  .querySelector(".search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".search-btn").click();
    }
  });
