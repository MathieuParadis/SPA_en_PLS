var key = process.env.RAWG_API_key;

const PageDetail = (argument) => {

  const buttonCheck = (text) => {
    let btn =  
      `<button class="btn btn-website">
        <a href="#" class="text-white link-website m-3 noHover">${text}   <i class="fas fa-play"></i></a>
      </button>`;
    return btn
  };
  
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const showPlatforms = (platformsArray) => {
      let array = []
      for (let platform of platformsArray) {
        array.push(platform.platform.name)
      }
      return array.join(", ")
    }

    const showPublishers = (publishersArray) => {
      let array = []
      for (let publisher of publishersArray) {
        array.push(publisher.name)
      }
      return array.join(", ")
    }

    const showDevelopers = (developersArray) => {
      let array = []
      for (let developer of developersArray) {
        array.push(developer.name)
      }
      return array.join(", ")
    }

    const showTags = (tagsArray) => {
      let array = []
      for (let tag of tagsArray) {
        array.push(tag.name)
      }
      return array.join(", ")
    }

    const showGenres = (genresArray) => {
      let array = []
      for (let genre of genresArray) {
        array.push(genre.name)
      }
      return array.join(", ")
    }

    const showStores = (storesArray) => {
      let array = [];
      for (let store of storesArray) {
        let s = `<a href="https://${store.store.domain}" class="text-white noHover">${store.store.name}</a>`;
        array.push(s);
      }
      return array.join(", ")
    }

    const fetchGame = (url, argument) => {
      let finalURL = url + argument + `?&key=${key}`;

      const displayScreenshot = (gameID) => {
        let url = `https://api.rawg.io/api/games/${gameID}/screenshots`
        let finalURL = url + `?&key=${key}`;
    
        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            let { results } = response;
            let articleDOM = document.querySelector(".page-detail .article");
            articleDOM.querySelector("div img.screenshot1").src = results[0].image;
            articleDOM.querySelector("div img.screenshot2").src = results[1].image;
            articleDOM.querySelector("div img.screenshot3").src = results[2].image;
            articleDOM.querySelector("div img.screenshot4").src = results[3].image;
          });
    };


      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { id, name, released, description, background_image, website, rating, rating_top, ratings_count, platforms, background_image_additional, publishers, tags, genres, developers, stores } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date").innerHTML += released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("div.banner").style.backgroundImage = `url(${background_image})`;
          articleDOM.querySelector("a.link-website").href = website;
          articleDOM.querySelector("div.gameDetails-title-rating h2").innerHTML = `${rating} / ${rating_top} - ${ratings_count} votes`;
          articleDOM.querySelector("p.developers").innerHTML += `<br>${showDevelopers(developers)}`;
          articleDOM.querySelector("p.platforms").innerHTML += `<br>${showPlatforms(platforms)}`;
          articleDOM.querySelector("p.publishers").innerHTML += `<br>${showPublishers(publishers)}`;
          articleDOM.querySelector("p.genres").innerHTML += `<br>${showGenres(genres)}`;
          articleDOM.querySelector("p.tags").innerHTML += `<br>${showTags(tags)}`;
          articleDOM.querySelector("p.stores").innerHTML += showStores(stores);
          displayScreenshot(id);
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="container-fluid">
            <div class="banner">
            ${buttonCheck("Check Website ")}
            </div>
          </div>
          <div class="gameDetails">
            <div class="gameDetails-title-rating">
              <h1 class="title text-white"></h1>
              <h2></h2>
            </div>
            <div class="text-white">
              <p class="description"></p>
              <div class="grid-info">
                <p class="release-date"><span>Release date </span></p>
                <p class="developers"><span>Developers </span></p>
                <p class="platforms"><span>Plateforms </span></p>
                <p class="publishers"><span>Publishers </span></p>
                <p class="genres"><span>Genre </span></p>
                <p class="tags"><span>Tags </span></p>
              </div>
            </div>
            <div>
            <h1 class="title-div">BUY</h1>
            <p class="stores text-white"></p>
            <h1 class="title-div">SCREENSHOT</h1>
            <div class="screenshot-section">
              <img class="screenshot1">
              <img class="screenshot2">
              <img class="screenshot3">
              <img class="screenshot4">
            </div>


            </div>
          </div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};







export { PageDetail };