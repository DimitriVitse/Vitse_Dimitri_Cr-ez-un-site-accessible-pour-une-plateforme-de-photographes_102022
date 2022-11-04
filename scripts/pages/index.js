async function createSectionPhotographers() {
    const photographers = await getDataPhotographers();
    const wrapperPhotographers = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const factoryPhotographer = photographerFactory(photographer);
        const cardPhotographer = factoryPhotographer.createPhotographerCard();
        wrapperPhotographers.appendChild(cardPhotographer);
    });
}

// Récupère les datas des photographes
async function getDataPhotographers() {
    const data = api("./data/photographers.json");
    const photographers = await data.getPhotographers();
    return photographers;
}

createSectionPhotographers();