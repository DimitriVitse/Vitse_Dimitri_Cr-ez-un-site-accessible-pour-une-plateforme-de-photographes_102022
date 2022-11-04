function carouselFactory(data) {
  const { title, video } = data;

  /*---------------------------------------- ----------------------------------------*/
  /*----------------------- Function création carousel -------------------------------*/
  /*---------------------------------------- ----------------------------------------*/
  function createItemcarousel(numItem) {
    const item = document.createElement("li");
    item.className = `carousel-item item-${numItem}`;
    item.setAttribute("aria-hidden", numItem === 0 ? false : true);
    item.innerHTML = `
        <div role="button" class="controls controls-left">
          <span class="img prev-image">
            <i aria-hidden="true" class="fa-solid fa-chevron-left"></i>
          </span>
          <p class="sr-only">Previous</p>
        </div>
        <div role="button" class="controls controls-right">
          <span class="img next-image">
            <i aria-hidden="true" class="fa-solid fa-chevron-right"></i>
          </span>
          <p class="sr-only">Next</p>
        </div>`;
    item.appendChild(createMediacarousel());
    return item;
  }

  /*---------------------------------------- ----------------------------------------*/
  /*----------------------- Function création media carousel------------------------*/
  /*---------------------------------------- ----------------------------------------*/
  function createMediacarousel() {
    const wrapper = document.createElement("div");
    wrapper.className = "carousel-content";

    const media = createMedia(data);
    media.className = "carousel-media";
    video && media.setAttribute("controls", true);

    const btnPlay = document.createElement("button");
    btnPlay.className = "btn-play";
    btnPlay.setAttribute("onclick", "playcarousel(this)");
    btnPlay.setAttribute("aria-label", "pause carousel");
    btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';

    const textContent = document.createElement("div");
    textContent.className = "text-content";
    const mediaText = document.createElement("p");
    mediaText.className = "carousel-title";
    mediaText.textContent = title;

    wrapper.appendChild(media);
    wrapper.appendChild(textContent);
    textContent.appendChild(mediaText);
    textContent.appendChild(btnPlay);
    return wrapper;
  }
  return { createItemcarousel };
}