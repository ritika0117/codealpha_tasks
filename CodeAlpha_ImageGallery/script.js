
// Image Gallery Data
const images = [
    // Nature
    { src: "images/nature1.jpg", category: "nature", title: "Majestic Mountain Escape" },
    { src: "images/nature2.jpg", category: "nature", title: "Beneath the Tall Pines" },
    { src: "images/nature3.jpg", category: "nature", title: "Winter Night Serenity" },
    { src: "images/nature4.jpg", category: "nature", title: "Tropical Coastal Paradise" },
    { src: "images/nature5.jpg", category: "nature", title: "Sunlight Through Forests" },

    // Architecture
    { src: "images/architecture1.jpg", category: "architecture", title: "Geometric Terracotta Facade" },
    { src: "images/architecture2.jpg", category: "architecture", title: "Curved Glass Architecture" },
    { src: "images/architecture3.jpg", category: "architecture", title: "Repeating Geometric Facade" },
    { src: "images/architecture4.jpg", category: "architecture", title: "Modern Interior Atrium" },
    { src: "images/architecture5.jpg", category: "architecture", title: "Futuristic White Architecture" },

    // Travel
    { src: "images/travel1.jpg", category: "travel", title: "Exploring Timeless Architecture" },
    { src: "images/travel2.jpg", category: "travel", title: "Wander Beyond Horizons" },
    { src: "images/travel3.jpg", category: "travel", title: "Memories Across Cultures" },
    { src: "images/travel4.jpg", category: "travel", title: "Adventures on Rails" },
    { src: "images/travel5.jpg", category: "travel", title: "Discover Hidden History" },

    // Animals
    { src: "images/animals1.jpg", category: "animals", title: "Cute Little Puppy" },
    { src: "images/animals2.jpg", category: "animals", title: "Curious Little Squirrel" },
    { src: "images/animals3.jpg", category: "animals", title: "Giraffes in the Wildlife Park" },
    { src: "images/animals4.jpg", category: "animals", title: "Raccoon in the Forest" },
    { src: "images/animals5.jpg", category: "animals", title: "Deer Among the Birds" }
];

// HTML Elements
const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageCaption = document.getElementById("imageCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

// Display Gallery Images
function displayImages(category = "all") {
    galleryGrid.innerHTML = "";

    currentImages = images.filter(image =>
        category === "all" || image.category === category
    );

    currentImages.forEach((image, index) => {
        const card = document.createElement("div");
        card.classList.add("gallery-item");

        card.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="image-overlay">
                <h3>${image.title}</h3>
                <p>${image.category}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            openLightbox(index);
        });

        galleryGrid.appendChild(card);
    });
}

// Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        displayImages(button.dataset.filter);
    });
});

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Update Lightbox Content
function updateLightbox() {
    const image = currentImages[currentIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    imageCaption.textContent = image.title;
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

// Next Image
function showNextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
}

// Previous Image
function showPrevImage() {
    currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;

    updateLightbox();
}

// Button Events
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);

// Close Lightbox When Clicking Outside Image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        showNextImage();
    } else if (event.key === "ArrowLeft") {
        showPrevImage();
    }
});

// Initial Gallery Display
displayImages();
