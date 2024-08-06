/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".nav__item.dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      const dropdownMenu = this.querySelector(".dropdown-menu");
      dropdownMenu.classList.toggle("show");

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          const otherDropdownMenu =
            otherDropdown.querySelector(".dropdown-menu");
          otherDropdownMenu.classList.remove("show");

          // Close submenus
          const submenus = otherDropdown.querySelectorAll(".submenu");
          submenus.forEach((submenu) => submenu.classList.remove("show"));
        }
      });
    });

    const submenuItems = dropdown.querySelectorAll(".submenu-item");
    submenuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent closing parent menu

        const parent = this.parentElement;
        const children = Array.from(parent.children);
        const itemIndex = children.indexOf(this);

        const submenu = this.querySelector(".submenu");
        submenu.classList.toggle("show");

        // Position submenu
        const rect = this.getBoundingClientRect();
        submenu.style.top = `${itemIndex * rect.height}px`; // Position directly below the parent item
        submenu.style.left = `100%`; // Adjust this as needed for your layout
      });
    });
  });

  // Close dropdowns and submenus when clicking outside
  document.addEventListener("click", function (e) {
    const isClickInside = e.target.closest(".nav__item.dropdown");
    if (!isClickInside) {
      dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");
        dropdownMenu.classList.remove("show");

        const submenus = dropdown.querySelectorAll(".submenu");
        submenus.forEach((submenu) => submenu.classList.remove("show"));
      });
    }
  });
});

$(".owl-carousel").owlCarousel({
  loop: true,
  responsiveClass: true,
  dots: false,
  nav: true,
  navText: [
    '<button class="prev__btn rounded-circle"><i class="ri-arrow-left-s-line"></i></button>',
    '<button class="next__btn rounded-circle"><i class="ri-arrow-right-s-line"></i></button>',
  ],
  responsive: {
    0: {
      items: 1,
      margin: 10,
      nav: false,
    },
    600: {
      items: 3,
      margin: 20,
    },
    1600: {
      items: 4,
      margin: 40,
    },
  },
});
