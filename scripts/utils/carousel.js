const prevBtn = document.querySelectorAll(".prev-image");
const nextBtn = document.querySelectorAll(".next-image");
const carouselItems = document.querySelectorAll(".carousel-item");
const carouselPauseBtn = document.querySelector(".carousel-pause-btn");
const closeBtn = document.querySelector(".carousel-photographer");
const btnPlay = document.querySelector(".btn-play");
const sectionWrapper = document.querySelector(".achievements_section");

let currentItemPosition = 0;
let carouselInterval;

function displaycarousel(index) {
    toggleFocusCard();
    sectionWrapper.setAttribute("aria-hidden", true);
    btnPlay.focus();
    const carousel = document.querySelector(".carousel-photographer");
    currentItemPosition = index;
    let lastItem = null;

    if (currentItemPosition === 0) {
        lastItem = `.item-${carouselItems.length - 1}`;
    } else {
        lastItem = `.item-${currentItemPosition - 1}`;
    }
    const currentItem = `.item-${currentItemPosition}`;
    setNodeAttributes(lastItem, currentItem);
    carousel.style.display = "block";
    carousel.setAttribute("aria-hidden", false);

    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => goToNextSlide(), 5000);
}

const closecarousel = () => {
    toggleFocusCard((add = true));
    addListenerEventKey();
    const carousel = document.querySelector(".carousel-photographer");
    carousel.style.display = "none";
    carousel.setAttribute("aria-hidden", true);
    sectionWrapper.setAttribute("aria-hidden", false);
    currentItemPosition = 0;

    document.querySelectorAll(".carousel-item").forEach((item) => {
        item.style.display = "none";
    });
    clearInterval(carouselInterval);
};

const goToNextSlide = () => {
    if (currentItemPosition + 1 >= carouselItems.length) {
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = 0;
        const currentItem = `.item-${currentItemPosition}`;

        setNodeAttributes(lastItem, currentItem);
    } else {
        currentItemPosition += 1;
        const lastItem = `.item-${currentItemPosition - 1}`;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >= 0) {
        currentItemPosition -= 1;
        const currentItem = `.item-${currentItemPosition}`;
        const lastItem = `.item-${currentItemPosition + 1}`;

        setNodeAttributes(lastItem, currentItem);
    } else {
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = carouselItems.length - 1;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

const setNodeAttributes = (lastItem, currentItem) => {
    lastItem = document.querySelector(lastItem);
    currentItem = document.querySelector(currentItem);
    lastItem.style.display = "none";
    currentItem.style.display = "block";
    lastItem.setAttribute("aria-hidden", "true");
    currentItem.setAttribute("aria-hidden", "false");
};

const createEventListenerModal = () => {
    const prevBtn = document.querySelectorAll(".prev-image");
    const nextBtn = document.querySelectorAll(".next-image");
    prevBtn.forEach((element) => {
        element.addEventListener("click", goToPreviousSlide);
    }),
        nextBtn.forEach((element) => {
            element.addEventListener("click", goToNextSlide);
        }),
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                goToNextSlide();
            } else if (event.key === "ArrowLeft") {
                goToPreviousSlide();
            }
        });
};

const toggleFocusCard = (add) => {
    const article = document.querySelectorAll(".achievements_section article a");
    const heartLike = document.querySelectorAll(
        ".achievements_section article .fa-heart"
    );
    article.forEach((card) => {
        card.setAttribute("tabindex", add ? "0" : "-1");
    });
    heartLike.forEach((heart) => {
        heart.setAttribute("tabindex", add ? "0" : "-1");
    });
    add && article[currentItemPosition].focus();
};

const playcarousel = (btnPlay) => {
    const icon = btnPlay.querySelector(".fa-solid");
    const classIcon = Array.prototype.slice.call(icon.classList);
    if (classIcon.includes("fa-pause")) {
        btnPlay.innerHTML =
            '<i class="fa-solid fa-play" aria-hidden="true" title="Stop carousel"></i>';
        clearInterval(carouselInterval);
    } else {
        btnPlay.innerHTML =
            '<i class="fa-solid fa-pause" aria-hidden="true" title="Play carousel"></i>';
        goToNextSlide();
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => goToNextSlide(), 5000);
    }
};

/*---------------------------------------- ----------------------------------------*/
/*----------------------- slideshow carousel --------------------------------------*/
/*---------------------------------------- ----------------------------------------*/
prevBtn.forEach((element) => {
    element.addEventListener("click", goToPreviousSlide);
}),
    nextBtn.forEach((element) => {
        element.addEventListener("click", goToNextSlide);
    }),
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            goToNextSlide();
        } else if (event.key === "ArrowLeft") {
            goToPreviousSlide();
        } else if (event.key === "Escape") {
            closecarousel();
        }
    });
