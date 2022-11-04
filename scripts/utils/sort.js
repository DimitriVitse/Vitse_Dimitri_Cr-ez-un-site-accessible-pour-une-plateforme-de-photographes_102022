async function orderBy(data) {
    const dataMedia = await getMedia();

    let NewSortedMedia = orderTraitement(dataMedia, data);

    makePortfolioCardsBySort(NewSortedMedia);

};


function orderTraitement(dataMedia, data) {

    let sortedMedia = [];

    if (data === "likes") {
        sortedMedia = dataMedia.sort((a, b) => b.likes - a.likes);
    } else if (data === "date") {
        sortedMedia = dataMedia.sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1);
    } else if (data === "title") {
        sortedMedia = dataMedia.sort(compare_to_sort);
    } else {
        return sortedMedia;
    }

    return sortedMedia;
}


function compare_to_sort(x, y) {
    if (x.title < y.title)
        return -1;
    if (x.title > y.title)
        return 1;
    return 0;
}

