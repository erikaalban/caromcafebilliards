// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const navbar = document.getElementById("navbar");

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", function () {
      navbar.classList.toggle("active");
      // Change the icon based on state
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#"
      if (href === "#") return;

      e.preventDefault();

      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Close mobile menu if it's open
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          if (mobileNavToggle) {
            const icon = mobileNavToggle.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }

        // Scroll to the target
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation state based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar a");

    // Get current scroll position
    const scrollY = window.pageYOffset;

    // Loop through sections to find the one in view
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Offset for header
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to corresponding link
        const correspondingLink = document.querySelector(
          `#navbar a[href="#${sectionId}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  // Update nav links on scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // Form submission handlers with basic validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // You would normally send this to your server
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // You would normally send this to your server
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    });
  }

  // Initialize the active nav link on page load
  updateActiveNavLink();

  // Slideshow functionality
  function initSlideshow() {
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".dots");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
        dots[index].classList.toggle("active", index === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlides();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    }

    // Event listeners
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Initialize slideshow
  initSlideshow();

  // Show tournament popup when page loads
  const popup = document.getElementById("tournament-popup");
  const closeBtn = document.querySelector(".close-popup");

  // Show popup
  popup.style.display = "block";

  // Close popup when clicking the X
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Close popup when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});
