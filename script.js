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
    "Full Stack Developer",
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

const changingName = document.getElementById("changing-name");

const names = [
    "Sanidhya",
    "सानिध्य",
    "Sanidhya",
    "サニディヤ",
    "Sanidhya",
    "Санидхья",
    "Sanidhya",
    "ஸாநித்யா"
];

let nameIndex = 0;

function updateName() {

    changingName.style.opacity = 0;

    setTimeout(() => {

        nameIndex = (nameIndex + 1) % names.length;

        changingName.textContent = names[nameIndex];

        changingName.style.opacity = 1;

    }, 257);
}

if (changingName) {

    changingName.style.transition = "opacity 0.3s ease";

    setInterval(updateName, 4000);
}

const karateImages = document.querySelectorAll(".karate-img");

let currentKarate = 0;

if (karateImages.length > 1) {
    setInterval(() => {
        karateImages[currentKarate].classList.remove("active");

        currentKarate = (currentKarate + 1) % karateImages.length;

        karateImages[currentKarate].classList.add("active");
    }, 3500);
}