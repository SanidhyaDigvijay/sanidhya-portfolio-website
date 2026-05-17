const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 300) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const changingRole = document.getElementById("changing-role");

const roles = [
    "Web Developer",
    "Competitive Programmer",
    "Open Source Enthusiast"
]

let roleIndex = 0;

function updateRole() {

    changingRole.style.opacity = 0;

    setTimeout(() => {

        roleIndex = (roleIndex + 1) % roles.length;

        changingRole.textContent = roles[roleIndex];

        changingRole.style.opacity = 1;

    }, 300);
}

if (changingRole) {

    changingRole.style.transition = "opacity 0.2s ease";

    setInterval(updateRole, 2500);
}