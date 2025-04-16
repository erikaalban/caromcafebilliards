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

    // Only initialize if all required elements exist
    if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) {
      console.log("Slideshow elements not found, skipping initialization");
      return;
    }

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

  // Menu data
  const menuData = {
    breakfast: {
      title: "Breakfast",
      subtitle: "Served All Day",
      items: [
        { name: "2 Eggs on Toast", price: "$3.50" },
        { name: "Pericos Eggs", price: "$7.00" },
        {
          name: "2 Eggs any Style",
          price: "$6.50",
          description:
            "with Ham, Bacon, or Sausage\nServed with Home Fries, Toasted White Bread & Butter, Coffee or Tea",
        },
        {
          name: "Mexican Style Eggs With RICE",
          price: "$7.00",
          description:
            "Scrambled Eggs with Green Pepper, Onion, Tomato, & Jalapeño, Coffee or Tea",
        },
      ],
    },
    appetizers: {
      title: "Appetizers",
      subtitle: "Choice of Honey Mustard, Ketchup, Hot Sauce",
      items: [
        {
          name: "Tostones (6 Pcs)",
          price: "$6.00",
          description: "Crispy Fried Plantains",
        },
        {
          name: "French Fries",
          price: "$6.00",
          description: "Golden Fries Perfect to the Crisp",
        },
        {
          name: "Cheese Fries",
          price: "$7.50",
          description: "Golden Fries topped with Cheddar Cheese",
        },
        {
          name: "Onion Rings",
          price: "$7.00",
          description: "Onions deep fried in Seasoned Crumbs",
        },
        {
          name: "Mozzarella Sticks (8 Pcs)",
          price: "$11.00",
          description: "Seasoned Bread Crumbs over Stretched Mozzarella",
        },
        {
          name: "Fried Dumplings (8 Pcs)",
          price: "$11.00",
          description: "Crispy Meat-Filled Asian style Dumplings",
        },
        {
          name: "Chicken Fingers (8 Pcs)",
          price: "$13.00",
          description: "Breaded Classic White Meat, Boneless Chicken",
        },
        {
          name: "Chicken Wings (7 Pcs)",
          price: "$14.00",
          description: "Crispy Fried and Juicy Drumettes and Wings",
        },
        {
          name: "Chicken Wings SUPERSIZE (11 Pcs)",
          price: "$17.00",
          description: "Crispy Fried and Juicy Drumettes and Wings",
        },
        {
          name: "Chef's Sampler",
          price: "$19.00",
          description:
            "Includes: French Fries, Onion Rings, Chicken Fingers, Chicken Wings and Mozzarella Sticks!",
        },
        {
          name: "Fish & Chips",
          price: "$12.00",
          description: "Fried Whiting with Tartar Sauce and French Fries",
        },
        {
          name: "Salchipapa",
          price: "$10.00",
          description: "French Fries and Sausages",
        },
      ],
    },
    burgers: {
      title: "Carom Burgers",
      subtitle: "Made from 100% USDA Ground Beef",
      items: [
        {
          name: "Jumbo Burger",
          price: "$7.00",
          description: "Includes Lettuce, Tomatoes, Mayo, Ketchup, & Pickle",
        },
        {
          name: "Jumbo Burger DELUXE",
          price: "$11.00",
          description:
            "Includes Lettuce, Tomatoes, Mayo, Ketchup, & Pickle with choice of French Fries or Onion Rings",
        },
        {
          name: "Jumbo Cheese Burger",
          price: "$8.00",
          description:
            "Includes Cheese, Lettuce, Tomatoes, Mayo, Ketchup, & Pickle",
        },
        {
          name: "Jumbo Cheese Burger DELUXE",
          price: "$12.00",
          description:
            "Includes Cheese, Lettuce, Tomatoes, Mayo, Ketchup, & Pickle with choice of French Fries or Onion Rings",
        },
        { name: "Fish Burger", price: "$7.00", description: "w/Tartar Sauce" },
        {
          name: "Deluxe Fish Burger",
          price: "$11.00",
          description: "w/Tartar Sauce, choice of French Fries or Onion Rings",
        },
      ],
    },
    sandwiches: {
      title: "Deli Sandwiches",
      subtitle: "Hero additional $1",
      items: [
        { name: "Hot Dog", price: "$4.00" },
        { name: "B.L.T.", price: "$9.00" },
        { name: "Tuna Fish", price: "$9.00" },
        { name: "Ham", price: "$9.00" },
        { name: "Pastrami", price: "$9.00" },
        { name: "Turkey", price: "$9.00" },
        { name: "Chicken Club", price: "$12.00" },
        { name: "Chicken Cutlet", price: "$12.00" },
        { name: "Carom Chicken Special Hero", price: "$13.00" },
      ],
    },
    korean: {
      title: "Korean Food",
      items: [
        {
          name: "Kimchi Bokkeum Bap (김치 볶음밥)",
          price: "$12.00",
          description: "Sauteed Vegetables & Kimchi Fried Rice with Egg",
        },
        {
          name: "Sun Du Bu (순두부)",
          price: "$12.00",
          description:
            "Spicy Soft Tofu Stew w/Sausage, Seafood, or Plain with Rice",
        },
        {
          name: "Jeyuk Deop Bap (제육 덮밥)",
          price: "$14.50",
          description: "Spicy Marinated Thinly Sliced Pork with Rice & Salad",
        },
        {
          name: "Bulgogi Deop Bap (불고기 덮밥)",
          price: "$15.50",
          description: "Marinated Thinly Sliced Rib Eye with Rice & Salad",
        },
        {
          name: "Galbi Deop Bap (갈비 덮밥)",
          price: "$17.00",
          description: "Sweet Soy Marinated Short Ribs with Rice & Salad",
        },
      ],
    },
    entrees: {
      title: "Entrees",
      items: [
        {
          name: "Grilled Steak (Rib Eye)",
          price: "$22.00",
          description: "Includes Rice, Salad, Beans, & Fried Egg",
        },
        {
          name: "Fresh Grilled Chicken",
          price: "$15.00",
          description: "Includes Rice, Salad, Beans, & Fried Egg",
        },
        {
          name: "Carom Chicken Special",
          price: "$15.00",
          description: "Sauteed Chicken, Jalapeños, Onions over Rice w/Salad",
        },
        {
          name: "Mexican Chicken",
          price: "$15.00",
          description: "Includes Rice, Salad, Beans, & Fried Egg",
        },
        {
          name: "Fish & Chips Platter",
          price: "$13.00",
          description:
            "Fried Whiting, w/Tartar Sauce, Rice, Salad, French Fries",
        },
        {
          name: "Tilapia Deluxe",
          price: "$15.00",
          description: "Fish Filet w/Sauteed Onions, Jalapeños and Tomatoes",
        },
      ],
    },
    noodles: {
      title: "Noodles & Soups",
      items: [
        {
          name: "Ichiban Noodle Soup",
          price: "$7.00",
          description:
            "Non-Spicy, Beef Flavored Noodle Soup with Egg\nAdd Rice $1.00, Add Sausage $2.00",
        },
        {
          name: "Shin Ramen",
          price: "$7.00",
          description:
            "Spicy, Beef Flavored Noodle Soup with Egg\nAdd Rice $1.00, Add Sausage $2.00",
        },
        {
          name: "Udon",
          price: "$9.00",
          description: "Non-Spicy, Seafood Flavored Japanese Noodle Soup",
        },
        {
          name: "Dumpling Soup",
          price: "$11.00",
          description: "Non-Spicy, Beef Flavored Soup w/Dumplings & Egg",
        },
      ],
    },
    pizza: {
      title: "Pizza",
      subtitle:
        "ADD TOPPINGS FOR $1 EACH\nExtra Cheese, Onions, Ham, Bacon, Jalapeños, Sausage",
      items: [
        { name: "Half Pie", price: "$7.00" },
        { name: "Full Pie", price: "$11.00" },
        {
          name: "Combo Full Pie",
          price: "$13.50",
          description: "three toppings",
        },
      ],
    },
    beverages: {
      title: "Beverages",
      sections: [
        {
          title: "Cold Drinks",
          items: [
            { name: "Poland Spring Water", price: "$1.50" },
            { name: "Perrier", price: "$2.00" },
            { name: "Soda", price: "$2.50" },
            { name: "Snapple", price: "$2.50" },
            { name: "Fruit Juice", price: "$3.00" },
            { name: "Iced Coffee", price: "$3.00" },
            { name: "Vita Coco COCONUT WATER", price: "$3.00" },
            { name: "Gatorade", price: "$3.00" },
          ],
        },
        {
          title: "Hot Drinks",
          items: [
            { name: "Gourmet Coffee", price: "$2.50" },
            { name: "Lipton Tea", price: "$2.50" },
            { name: "Herbal Tea", price: "$2.50" },
            { name: "Green Tea", price: "$2.50" },
          ],
        },
        {
          title: "Energy Drinks",
          items: [
            { name: "Red Bull", price: "$3.50" },
            { name: "Monster", price: "$3.50" },
          ],
        },
      ],
    },
    beer: {
      title: "Beer",
      sections: [
        {
          title: "Import Bottled Beer",
          price: "$6.00",
          items: [
            "Corona",
            "Heineken",
            "Modelo Especial",
            "Negra Modelo",
            "Pacifico",
            "Stella Artois",
          ],
        },
        {
          title: "Domestic Bottled Beer",
          price: "$5.00",
          items: ["Budweiser", "Coors Light"],
        },
        {
          title: "Special Brews",
          price: "$6.00",
          items: ["Angry Orchard", "Not Your Father's Root Beer"],
        },
        {
          title: "DRAFT Beer",
          items: [
            { name: "Coors Light", pint: "$4.00", pitcher: "$12.00" },
            { name: "Blue Moon", pint: "$7.00", pitcher: "$18.00" },
            { name: "Modelo Especial", pint: "$7.00", pitcher: "$18.00" },
            { name: "Montauk", pint: "$7.00", pitcher: "$18.00" },
            {
              name: "Sam Adams Boston Lager",
              pint: "$7.00",
              pitcher: "$18.00",
            },
            { name: "Sam Adams Seasonal", pint: "$7.00", pitcher: "$18.00" },
            {
              name: "Schöfferhofer Grapefruit",
              pint: "$7.00",
              pitcher: "$18.00",
            },
            { name: "Stella Artois", pint: "$7.00", pitcher: "$18.00" },
          ],
        },
        {
          title: "Bucket Specials",
          items: [
            { name: "Import Bottled Beer", price: "BUCKET OF SIX FOR $30.00" },
            {
              name: "Domestic Bottled Beer",
              price: "BUCKET OF SIX FOR $24.00",
            },
          ],
        },
        {
          title: "HAPPY HOUR",
          subtitle: "4pm – 8pm",
          items: ["$3 Domestic Draft", "$4 Craft & Import Draft"],
        },
      ],
    },
  };

  // Tournament popup functionality
  const popup = document.getElementById("tournament-popup");
  if (popup) {
    const popupCloseBtn = document.querySelector(".close-popup");

    // Show popup
    popup.style.display = "block";

    // Close popup when clicking the X
    if (popupCloseBtn) {
      popupCloseBtn.addEventListener("click", function () {
        popup.style.display = "none";
      });
    }

    // Close popup when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  }

  // Menu Section Functionality
  const menuCards = document.querySelectorAll(".menu-section-card");

  function toggleSection(card) {
    const section = card.getAttribute("data-section");
    const data = menuData[section];
    const contentDiv = card.querySelector(".menu-items");
    const contentContainer = card.querySelector(".menu-section-content");

    // If this card is already active, just toggle it closed
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      return;
    }

    // Close all other sections
    menuCards.forEach((otherCard) => {
      otherCard.classList.remove("active");
    });

    // Open this section
    card.classList.add("active");

    // Only load content if it hasn't been loaded yet
    if (!contentDiv.children.length) {
      // Clear existing content
      contentDiv.innerHTML = "";

      // Add subtitle if it exists (only once)
      if (data.subtitle && !contentContainer.querySelector(".section-note")) {
        const subtitle = document.createElement("p");
        subtitle.className = "section-note";
        subtitle.textContent = data.subtitle;
        contentContainer.insertBefore(subtitle, contentDiv);
      }

      // Handle different types of menu sections
      if (section === "beverages" || section === "beer") {
        // Sections with subcategories
        data.sections.forEach((section) => {
          // Add section title
          const sectionTitle = document.createElement("h4");
          sectionTitle.textContent = section.title;
          sectionTitle.className = "submenu-title";
          contentDiv.appendChild(sectionTitle);

          // Add section subtitle if it exists
          if (section.subtitle) {
            const sectionSubtitle = document.createElement("p");
            sectionSubtitle.className = "section-note";
            sectionSubtitle.textContent = section.subtitle;
            contentDiv.appendChild(sectionSubtitle);
          }

          // Add section price if it exists (for beer categories)
          if (section.price) {
            const priceNote = document.createElement("p");
            priceNote.className = "section-note";
            priceNote.textContent = section.price;
            contentDiv.appendChild(priceNote);
          }

          // Handle different types of items
          if (Array.isArray(section.items)) {
            if (section.title === "DRAFT Beer") {
              // Special handling for draft beers
              section.items.forEach((item) => {
                const menuItem = document.createElement("div");
                menuItem.className = "menu-item";

                const header = document.createElement("div");
                header.className = "item-header";

                const name = document.createElement("h4");
                name.textContent = item.name;

                const price = document.createElement("span");
                price.className = "price";
                price.textContent = `${item.pint} / ${item.pitcher}`;

                header.appendChild(name);
                header.appendChild(price);
                menuItem.appendChild(header);

                contentDiv.appendChild(menuItem);
              });
            } else if (typeof section.items[0] === "string") {
              // Simple list of items (like bottled beers)
              section.items.forEach((item) => {
                const menuItem = document.createElement("div");
                menuItem.className = "menu-item";

                const header = document.createElement("div");
                header.className = "item-header";

                const name = document.createElement("h4");
                name.textContent = item;

                header.appendChild(name);
                menuItem.appendChild(header);

                contentDiv.appendChild(menuItem);
              });
            } else {
              // Regular items with name and price
              section.items.forEach((item) => {
                const menuItem = document.createElement("div");
                menuItem.className = "menu-item";

                const header = document.createElement("div");
                header.className = "item-header";

                const name = document.createElement("h4");
                name.textContent = item.name;

                const price = document.createElement("span");
                price.className = "price";
                price.textContent = item.price;

                header.appendChild(name);
                header.appendChild(price);
                menuItem.appendChild(header);

                if (item.description) {
                  const desc = document.createElement("p");
                  desc.textContent = item.description;
                  menuItem.appendChild(desc);
                }

                contentDiv.appendChild(menuItem);
              });
            }
          }
        });
      } else {
        // Regular menu items
        data.items.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.className = "menu-item";

          const header = document.createElement("div");
          header.className = "item-header";

          const name = document.createElement("h4");
          name.textContent = item.name;

          const price = document.createElement("span");
          price.className = "price";
          price.textContent = item.price;

          header.appendChild(name);
          header.appendChild(price);
          menuItem.appendChild(header);

          if (item.description) {
            const desc = document.createElement("p");
            desc.textContent = item.description;
            menuItem.appendChild(desc);
          }

          contentDiv.appendChild(menuItem);
        });
      }
    }
  }

  // Add click event to all menu section cards
  menuCards.forEach((card) => {
    card.addEventListener("click", () => {
      toggleSection(card);
    });
  });
});
