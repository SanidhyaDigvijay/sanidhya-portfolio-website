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

const historySlides = document.querySelectorAll(".history-slide");

let historyIndex = 0;

setInterval(() => {

    historySlides[historyIndex].classList.remove("active");

    historyIndex = (historyIndex + 1) % historySlides.length;

    historySlides[historyIndex].classList.add("active");

}, 400);




const codeData = {
    codeforces: {
        label: "Competitive Programming",
        title: "Codeforces",
        description: "Contest-driven problem solving focused on logic, implementation, and algorithmic thinking.",
        link: "https://codeforces.com/profile/Sanidhya_Digvijay"
    },

    codechef: {
        label: "Competitive Practice",
        title: "CodeChef",
        description: "Regular contests and practice sessions that help me stay consistent with problem solving.",
        link: "https://www.codechef.com/users/sanidhya_000"
    },

    leetcode: {
        label: "DSA Practice",
        title: "LeetCode",
        description: "A space for strengthening data structures, algorithms, and interview-focused thinking.",
        link: "https://leetcode.com/u/Sanidhya_Digvijay/"
    },

    github: {
        label: "Development Work",
        title: "GitHub",
        description: "Projects, experiments, commits, and the place where my development work takes shape.",
        link: "https://github.com/SanidhyaDigvijay"
    }
};

const codeTabs = document.querySelectorAll(".code-tab");
const codePanel = document.querySelector(".code-panel");

const codeLabel = document.getElementById("code-label");
const codeTitle = document.getElementById("code-title");
const codeDescription = document.getElementById("code-description");
const codeLink = document.getElementById("code-link");

codeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const platform = tab.dataset.platform;
        const data = codeData[platform];

        codeTabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");

        codePanel.classList.add("fade");

        setTimeout(() => {
            codeLabel.textContent = data.label;
            codeTitle.textContent = data.title;
            codeDescription.textContent = data.description;
            codeLink.href = data.link;

            codePanel.classList.remove("fade");
        }, 220);
    });
});

const reachToggle = document.querySelector(".reach-toggle");
const reachLinks = document.querySelector(".mini-reach-links");

reachToggle.addEventListener("click", () => {
    reachLinks.classList.toggle("active");
});