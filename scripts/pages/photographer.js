//Mettre le code JavaScript lié à la page photographer.htmldocument.addEventListener("DOMContentLoaded", function (event) {
async function getDataPhotographer() {
    const data = api("./data/photographers.json");
    const photographer = await data.getPhotographer(getParamId());
    return photographer;
}

async function getMedia() {
    const data = api("./data/photographers.json");
    const media = await data.getMedia(getParamId());
    return media;

}

function getTotalLike(media) {
    let totalLikes = 0;
    media.forEach((element) => {
        totalLikes += element.likes;
    });
    return { totalLikes: totalLikes };
}

function mergePhotographerData(photographer, totalLike) {
    return { ...totalLike, ...photographer };
}

function makePortfolioHeader(photographer) {
    const wrapper = document.querySelector(".photograph-header");
    const factoryPhotographer = photographerFactory(photographer);
    const headerPhotographer = factoryPhotographer.createPhotographerHeader();
    wrapper.appendChild(headerPhotographer);
}

function mergeMedia(photographer, media) {
    const name = { name: photographer.name.split(" ")[0] };
    let mediaMerge = [];
    media.forEach((element) => {
        mediaMerge.push({ ...name, ...element });
    });
    return mediaMerge;

}

function makePortfolioCards(media) {
    const wrapper = document.querySelector(".achievements_section");
    media.forEach((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        const portfolioCard = factoryPortfolio.createPortfolioCard(index);
        wrapper.appendChild(portfolioCard);
    });
}

function reMakePortfolioCard(media, idCard) {
    const wrapper = document.getElementById(idCard);
    const index = wrapper.dataset.index;
    const factoryPortfolio = portfolioFactory(media);
    const portfolioCard = factoryPortfolio.createPortfolioCard(index);
    wrapper.parentNode.replaceChild(portfolioCard, wrapper);
    addListenerEventKey();
}

function makecarousel(media) {
    const wrapper = document.querySelector("#carousel-list");
    media.forEach((element, index) => {
        const factorycarousel = carouselFactory(element);
        const item = factorycarousel.createItemcarousel(index);
        wrapper.appendChild(item);
    });
}

function initcarouselManager() {
    let script = document.createElement("script");
    script.src = "./scripts/utils/carousel.js";
    document.head.appendChild(script);
}

function setNameContact(photographer) {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-describedby", `contactez ${photographer.name}`);
    const modalTitle = document.querySelector(".modal header h2");
    modalTitle.setAttribute("id", `contactez ${photographer.name}`);
    modalTitle.innerHTML = `Contactez-moi<br/> ${photographer.name}`;
}

function makeSticky(photographer) {
    const wrapper = document.body;
    const factoryPhotographer = photographerFactory(photographer);
    const sticky = factoryPhotographer.createStickyTotalLikes();
    wrapper.appendChild(sticky);
}

async function makeStickyAfterLike() {
    let photographer = await getDataPhotographer();
    const card = document.querySelectorAll(".achievements_section article");
    const sticky = document.querySelector(".cost-card");
    let totalLikes = 0;

    card.forEach((element) => {
        totalLikes += parseInt(element.dataset.likes);
    });
    photographer = { ...photographer, ...{ totalLikes: totalLikes } };

    sticky.parentNode.removeChild(sticky);
    makeSticky(photographer);
}

function toggleLike(idCard) {
    let article = document.getElementById(idCard);
    let heart = article.querySelector(".fa-heart");
    heart.classList.toggle("fa-solid");

    if (heart.classList.contains("fa-regular")) {
        likeCard(idCard, (add = true));
    } else {
        likeCard(idCard, (add = false));
    }
}

function likeCard(idCard, add) {
    const card = document.getElementById(idCard);
    const object = card.dataset;
    let data = {};
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            data = { ...data, ...{ [key]: object[key] } };
        }
    }
    if (add) {
        data.likes = parseInt(data.likes) + 1;
        data = { ...data, ...{ liked: true } };
    } else {
        data.likes = parseInt(data.likes) - 1;
        data = { ...data, ...{ liked: false } };
    }
    reMakePortfolioCard(data, idCard);
    makeStickyAfterLike();
}

/*---------------------------------------- ----------------------------------------*/
/*----------------------- Function display sorted------------- --------------------*/
/*---------------------------------------- ----------------------------------------*/
async function makePortfolioCardsBySort(data) {

    let newData = [];
    //remove child
    const achievementsSection = document.querySelector(".achievements_section");
    achievementsSection.textContent = "";
    const carouselList = document.querySelector("#carousel-list");
    carouselList.textContent = "";

    const UrlJson = api("./data/photographers.json");
    const photographer = await UrlJson.getPhotographer(getParamId());

    const namePhotographer = photographer.name.split(' ');

    data.forEach((achievement, index) => {

        newData.push({
            id: achievement.id,
            index: index,
            date: achievement.date,
            name: namePhotographer[0],
            title: achievement.title,
            image: achievement.image,
            video: achievement.video,
            likes: achievement.likes,
            liked: achievement.liked,
        });

    });

    makePortfolioCards(newData);
    makecarousel(newData);
    createEventListenerModal();
    addListenerEventKey();
}

async function init() {
    const dataPhotographer = await getDataPhotographer();
    const dataMedia = await getMedia();
    const totalLikes = getTotalLike(dataMedia);
    const mergeDataPhotographer = mergePhotographerData(
        dataPhotographer,
        totalLikes
    );
    const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);

    makePortfolioHeader(mergeDataPhotographer);
    makePortfolioCards(mergeDataMedia);
    makecarousel(mergeDataMedia);
    initcarouselManager();
    setNameContact(dataPhotographer);
    makeSticky(mergeDataPhotographer);
}

function addListenerEventKey() {
    const article = document.querySelectorAll(".achievements_section article a");
    const heartLike = document.querySelectorAll(
        ".achievements_section article .fa-heart"
    );
    const carousel = document.querySelector(".carousel-photographer");
    const carouselIsClose = carousel.getAttribute("aria-hidden");
    article.forEach((card) => {
        card.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Enter" && carouselIsClose) event.target.click();
            },
            { once: true }
        );
    });
    heartLike.forEach((heart) => {
        heart.addEventListener("keydown", (event) => {
            if (event.key === "Enter") event.target.click();
        });
    });
}

document.addEventListener("readystatechange", async (event) => {
    if (event.target.readyState === "interactive") {
        await init();
        addListenerEventKey();
    }
});

