// eslint-disable-next-line no-unused-vars
function api(url) {
    //const url = url;
    async function get(type) {
        return fetch(url)
            .then((res) => res.json())
            .then((res) => res[type])
            .catch((err) => console.log("an error occurs", err));
    }

    async function findById(type, id) {
        return fetch(url)
            .then((res) => res.json())
            .then((res) => res[type].find((item) => item.id === parseInt(id)))
            .catch((err) => console.log("an error occurs", err));
    }
    async function filterById(type, id) {
        return fetch(url)
            .then((res) => res.json())
            .then((res) =>
                res[type].filter((item) => item.photographerId === parseInt(id))
            )
            .catch((err) => console.log("an error occurs", err));
    }

    /*---------------------------------------- ----------------------------------------*/
    /*----------------------- Function qui return les photographes --------------------*/
    /*---------------------------------------- ----------------------------------------*/
    function getPhotographers() {
        return get("photographers");
    }

    /*---------------------------------------- ----------------------------------------*/
    /*------ Function qui return un photographes grace au params ID ----------------*/
    /*---------------------------------------- ----------------------------------------*/
    function getPhotographer(id) {
        return findById("photographers", id);
    }

    /*---------------------------------------- ----------------------------------------*/
    /*------ Function qui return un media grace au params ID ----------------*/
    /*---------------------------------------- ----------------------------------------*/
    function getMedia(id) {
        return filterById("media", id);
    }

    return {
        getPhotographers,
        getPhotographer,
        getMedia,
    };
}
