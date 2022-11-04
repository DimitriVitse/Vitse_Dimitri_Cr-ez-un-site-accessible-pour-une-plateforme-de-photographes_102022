function createMedia(data) {
    const { name, image, video, title } = data;
    if (image && image != "undefined") {
        const img = document.createElement("img");
        img.setAttribute("src", `assets/images/${name}/${image}`);
        img.setAttribute("alt", `${name} ${title}`);
        return img;
    } else {
        const vid = document.createElement("video");
        vid.setAttribute("src", `assets/images/${name}/${video}`);
        vid.setAttribute("title", title);
        return vid;
    }
}
