// St Mary's Jacobite Syrian Orthodox Church, Pangada
// Replace the sample values below only with details confirmed by the parish.

const CHURCH_SETTINGS = {
  // Paste the official Google Maps share URL here.
  mapsUrl: "https://maps.app.goo.gl/J28tGdJ5npnKcC8G7",
  // Paste the official YouTube/Facebook livestream URL here.
  livestreamUrl: "",
  // Add verified service timings in index.html.
};

const languageToggle = document.getElementById("languageToggle");
let currentLanguage = "en";

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.body.classList.toggle("ml", language === "ml");

  document.querySelectorAll("[data-en][data-ml]").forEach((element) => {
    const value = language === "ml" ? element.getAttribute("data-ml") : element.getAttribute("data-en");
    if (value !== undefined) element.innerHTML = value;
  });

  languageToggle.textContent = language === "en" ? "മലയാളം" : "English";
  languageToggle.setAttribute("aria-label", language === "en" ? "Switch to Malayalam" : "Switch to English");
}

languageToggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "en" ? "ml" : "en");
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Gallery lightbox: opens a real image only after you add it to assets/images.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const imagePath = item.dataset.full;
    lightboxImage.src = imagePath;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function hideLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
}
closeLightbox.addEventListener("click", hideLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) hideLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideLightbox();
});

// Use verified official URLs only. Keep the buttons informational until configured.
const mapLink = document.getElementById("mapLink");
const liveLink = document.getElementById("liveLink");

if (CHURCH_SETTINGS.mapsUrl) {
  mapLink.href = CHURCH_SETTINGS.mapsUrl;
} else {
  mapLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("The church's verified Google Maps link has not been added yet.");
  });
}

if (CHURCH_SETTINGS.livestreamUrl) {
  liveLink.href = CHURCH_SETTINGS.livestreamUrl;
  liveLink.textContent = currentLanguage === "en" ? "Watch livestream" : "ലൈവ് കാണുക";
} else {
  liveLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("The church's official livestream link has not been added yet.");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
// Scroll reveal animation
const revealElements = document.querySelectorAll(
    ".church-history, .leaders .section-heading, .leader-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});
// Copy Church UPI ID
async function copyUPI() {
    const upiID = "QR917907852449-1701@unionbankofindia";

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(upiID);
        } else {
            const input = document.createElement("textarea");
            input.value = upiID;
            input.style.position = "fixed";
            input.style.opacity = "0";

            document.body.appendChild(input);
            input.select();

            const copied = document.execCommand("copy");
            input.remove();

            if (!copied) throw new Error("Copy failed");
        }

        alert("UPI ID copied successfully!");
    } catch (error) {
        alert("Please copy the UPI ID manually: " + upiID);
    }
}