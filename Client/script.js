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
    link: "https://codeforces.com/profile/Sanidhya_Digvijay",
    type: "codeforces"
    },

    codechef: {
    label: "Competitive Practice",
    title: "CodeChef",
    description: "A practice space where I keep sharpening consistncy, contest mindset, and problem-solving speed.Competitive programming practice centered around consistency, implementation accuracy, and improving problem-solving instincts.",
    link: "https://www.codechef.com/users/sanidhya_000",
    type: "codechef"
    },

    leetcode: {
    label: "DSA Practice",
    title: "LeetCode",
    description: "A space where I refine structured thinking, deepen algorithmic understanding, and explore cleaner approaches to problem solving.Focused on sharpening analytical thinking through structured DSA practice, optimization patterns, and implementation.",
    link: "https://leetcode.com/u/Sanidhya_Digvijay/",
    type: "leetcode"
    },

    github: {
    label: "Development Work",
    title: "GitHub",
    description: "Projects, commits, experiments, and the place where my development work takes shape.",
    link: "https://github.com/SanidhyaDigvijay",
    type: "github"
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
    if (data.type === "leetcode" || data.type === "codechef") {
    codeDescription.textContent = "";
} else {
    codeDescription.textContent = data.description;
}
    codeLink.href = data.link;

    if (data.type === "codeforces") {
        loadCodeforcesGraph();
    }

    else if (data.type === "github") {
        loadGitHubStats();
    }

    else if (data.type === "leetcode" || data.type === "codechef") {

    if (codeforcesChart) {
        codeforcesChart.destroy();
    }

    const chartBox = document.querySelector(".code-chart");

    chartBox.innerHTML = `
        <div class="code-text-content">
            <p>
                ${data.description}
            </p>
        </div>
    `;
}

    codePanel.classList.remove("fade");
    }, 220);
    });
});

const reachToggle = document.querySelector(".reach-toggle");
const reachLinks = document.querySelector(".mini-reach-links");

reachToggle.addEventListener("click", () => {
    reachLinks.classList.toggle("active");
});

async function testBackend() {

    try {

        const response = await fetch("https://sanidhya-portfolio-backend.onrender.com/api/test");

        const data = await response.json();

        console.log(data.message);

    }

    catch(error) {

        console.log("Backend connection failed");

    }

}

testBackend();


let codeforcesChart;

async function loadCodeforcesGraph() {
    try {
        const chartBox = document.querySelector(".code-chart");
        chartBox.innerHTML = `<canvas id="codeforcesChart"></canvas>`;

        const response = await fetch("https://sanidhya-portfolio-backend.onrender.com/api/codeforces/Sanidhya_Digvijay");
        const data = await response.json();

        const labels = data.graphData.map(item => item.date);
        const ratings = data.graphData.map(item => item.rating);

        const ctx = document.getElementById("codeforcesChart");

        if (!ctx) return;

        if (codeforcesChart) {
            codeforcesChart.destroy();
        }

        codeforcesChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    data: ratings,
                    borderColor: "#f4e66a",
                    backgroundColor: "rgba(244,230,106,0.08)",
                    borderWidth: 2,
                    tension: 0.35,
                    fill: true,
                    pointRadius: 0,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                },

                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        ticks: {
                            color: "rgba(203,213,225,0.6)"
                        },
                        grid: {
                            color: "rgba(255,255,255,0.05)"
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.log("Codeforces graph failed to load");
    }
}

loadCodeforcesGraph();


async function loadGitHubStats() {
    const response = await fetch("https://sanidhya-portfolio-backend.onrender.com/api/github/SanidhyaDigvijay");
    const data = await response.json();

    const chartBox = document.querySelector(".code-chart");

    if (codeforcesChart) {
        codeforcesChart.destroy();
    }

    chartBox.innerHTML = `
        <div class="github-stats">
            <div>
                <strong>${data.publicRepos}</strong>
                <span>Public Repos</span>
            </div>

            <div>
                <strong>${data.followers}</strong>
                <span>Followers</span>
            </div>

            <div>
                <strong>Active</strong>
                <span>Profile Status</span>
            </div>
        </div>
    `;
}


function drawChart(labels, values, label) {
    const ctx = document.getElementById("codeforcesChart");

    if (codeforcesChart) {
        codeforcesChart.destroy();
    }

    codeforcesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label,
                data: values,
                borderColor: "#f4e66a",
                backgroundColor: "rgba(244,230,106,0.08)",
                borderWidth: 2,
                tension: 0.35,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: {
                    ticks: { color: "rgba(203,213,225,0.6)" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}