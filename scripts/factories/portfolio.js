/* exported achievementsFactory*/
function portfolioFactory(data) {
  const { date, id, name, title, image, video, likes, liked } = data;

  /*---------------------------------------- ----------------------------------------*/
  /*----------------------- Function carte portfolio --------------------------------*/
  /*---------------------------------------- ----------------------------------------*/
  function createPortfolioCard(index) {
    const article = document.createElement("article");
    article.setAttribute("id", id);
    article.dataset.id = id;
    article.dataset.index = index;
    article.dataset.date = date;
    article.dataset.name = name;
    article.dataset.title = title;
    article.dataset.image = image;
    article.dataset.video = video;
    article.dataset.likes = likes;
    article.dataset.liked = liked;

    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("onclick", `displaycarousel(${index})`);
    link.setAttribute("tabindex", "0");
    link.appendChild(createMedia(data));

    const achievementText = document.createElement("p");

    achievementText.innerHTML = `      
        ${title} 
        <span>
          ${likes} 
          <span 
            class= "${liked && liked != "undefined"
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart"
      }" 
            title="likes"
            aria-hidden ="false"
            tabindex="0"
            title="add like" 
            onclick ="toggleLike(${id})"
          ></span>
          <span class="sr-only">add like for ${title}</span>
        </span>      
      `;
    article.appendChild(link);
    article.appendChild(achievementText);
    //article += $article.innerHTML = achievementText;
    return article;
  }

  return {
    createPortfolioCard,
  };
}
