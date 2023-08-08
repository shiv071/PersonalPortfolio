const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});

window.addEventListener('scroll', function() {
  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('nav a');
  let currentSection = '';
  sections.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 50) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) == currentSection) {
      link.classList.add('active');
    }
  });
});
