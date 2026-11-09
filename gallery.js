const filterButtons = document.querySelectorAll(".gallery-categories button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active style from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Highlight selected button
        this.classList.add("active");

        const selectedCategory = this.dataset.filter;

        // Show or hide photos
        galleryItems.forEach(item => {

            const photoCategory = item.dataset.category;

            if (selectedCategory === "all" ||
                selectedCategory === photoCategory) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});
// =================================
// PHOTO LIGHTBOX FUNCTIONALITY
// =================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeButton = document.getElementById("lightboxClose");
const prevButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

let currentPhotoIndex = 0;

// Get all gallery photos
function getVisiblePhotos() {
    return Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}

// Open photo
galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        const visiblePhotos = getVisiblePhotos();

        currentPhotoIndex = visiblePhotos.indexOf(this);

        showPhoto();
        lightbox.classList.add("active");

    });

});

// Display selected photo
function showPhoto() {

    const visiblePhotos = getVisiblePhotos();

    if (visiblePhotos.length === 0) return;

    const image = visiblePhotos[currentPhotoIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

}

// Next photo
nextButton.addEventListener("click", function () {

    const visiblePhotos = getVisiblePhotos();

    currentPhotoIndex =
        (currentPhotoIndex + 1) % visiblePhotos.length;

    showPhoto();

});

// Previous photo
prevButton.addEventListener("click", function () {

    const visiblePhotos = getVisiblePhotos();

    currentPhotoIndex =
        (currentPhotoIndex - 1 + visiblePhotos.length) %
        visiblePhotos.length;

    showPhoto();

});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// Keyboard controls
document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

});