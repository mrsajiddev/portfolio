/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("active"));

    menuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    });

});

/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        window.scrollTo({

            top: target.offsetTop - 70,

            behavior: "smooth"

        });

    });

});

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement = document.getElementById("typing");

const professions = [

    "Senior Software Engineer",

    "Laravel Developer",

    "WordPress Expert",

    "React & Next.js Developer",

    "Node.js Developer",

    "AI Integration Engineer",

    "LLM & RAG Developer"

];

let professionIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentProfession = professions[professionIndex];

    if (!deleting) {

        typingElement.textContent =
            currentProfession.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentProfession.length) {

            deleting = true;

            setTimeout(typeEffect, 1800);

            return;

        }

    } else {

        typingElement.textContent =
            currentProfession.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            professionIndex++;

            if (professionIndex >= professions.length) {

                professionIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}

typeEffect();

/* =====================================================
   CURRENT YEAR
===================================================== */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/* =====================================================
   SCROLL TO TOP
===================================================== */

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* =====================================================
   NAVBAR EFFECT
===================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(8,17,31,.92)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(8,17,31,.70)";
        header.style.boxShadow = "none";

    }

});

/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(
    ".section-header, .timeline-item, .project-card, .service-card, .workflow-step, .skill-category, .info-card, .stat-card, .contact-wrapper"
).forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});

/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".stat-card h2");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const finalText = counter.textContent;

        const number = parseInt(finalText);

        if (isNaN(number)) return;

        let current = 0;

        const increment = Math.max(1, Math.ceil(number / 40));

        const timer = setInterval(() => {

            current += increment;

            if (current >= number) {

                counter.textContent = finalText;

                clearInterval(timer);

            } else {

                counter.textContent =
                    current + finalText.replace(/[0-9]/g, "");

            }

        }, 30);

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => counterObserver.observe(counter));

/* =====================================================
   PARALLAX BACKGROUND
===================================================== */

const circles = document.querySelectorAll(".bg-circle");

window.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {

        const speed = (index + 1) * 20;

        circle.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});

/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + "px";

        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";

        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

        ripple.className = "ripple";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* =====================================================
   CONTACT FORM (opens the visitor's email app, works on GitHub Pages)
===================================================== */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const data = new FormData(contactForm);
        const name = (data.get("name") || "").trim();
        const email = (data.get("email") || "").trim();
        const subject = (data.get("subject") || "").trim() || "Portfolio enquiry";
        const message = (data.get("message") || "").trim();

        if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {

            formStatus.textContent = "Please add your name, a valid email and a message.";
            formStatus.classList.add("error");
            return;

        }

        formStatus.classList.remove("error");
        formStatus.textContent = "Opening your email app...";

        const body = `${message}\n\n${name}\n${email}`;

        window.location.href =
            `mailto:mr.sajidbwn@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    });

}

/* =====================================================
   PRELOADER (OPTIONAL)
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    `%c👋 Welcome to Muhammad Sajid's Portfolio`,
    "color:#3b82f6;font-size:20px;font-weight:bold;"
);

console.log(
    "%cBuilt with HTML, CSS & JavaScript",
    "color:#60a5fa;font-size:14px;"
);