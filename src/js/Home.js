var key = process.env.RAWG_API_key;

const Home = (page = 1) => {

  const Button = (text) => {
    return `<button class="btn" id="${text}">${text}</button>`;
  };


  const preparePage = () => {
    let articles = "";

    const showTags = (tagsArray) => {
      let array = []
      for (let tag of tagsArray) {
        array.push(tag.name)
      }
      return array.slice(0, 10).join(", ")
    }


    const fetchList = (url) => {
      let finalURL = url + `&key=${key}`;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
                  <div class="cardGame col-4 p-3">
                        <div class="col-12 col-sm-4 flip-card border-success text-center">
                          <div class="flip-card-inner">
                            <div class="flip-card-front pic" style="background-image: url('${article.background_image}');"></div>
                            <div class="flip-card-back text-white text-center">
                              <div class="game-info text-white">
                                <h5 class="date">${article.released}</h5>
                                <h5 class="rating">${article.rating} / ${article.rating_top} - ${article.ratings_count} votes</h5>
                                <p class="tags">${showTags(article.tags)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    <a href = "#pagedetail/${article.id}" class="h3 text-white noHover link">${article.name}</a>
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };
    

    fetchList(`https://api.rawg.io/api/games?page_size=${page*9}&dates=2021-08-01,2022-08-01&ordering=-added`);
  };

  const render = () => {
    pageContent.innerHTML = `
      <div>
        <h1 class="title text-white mt-4">Welcome,</h1>
        <p class="text-white">
          The Hyper Progame is the world’s premier event for computer and video games and related products. 
          At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, 
          brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new 
          technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new and existing partners, 
          industry executives, gamers, and social influencers providing unprecedented exposure.
        </p>
      </div>
      <section class="page-list container d-flex flex-column flex-start">
        <div class="articles row text-left">...loading</div>
        <div class="mt-5 pt-2 text-center">
          ${Button("Show more")}
        </div>
      </section>
    `;

    if (page >= 3) {
      page = 3;
      const btnShowMore = document.getElementById('Show more');
      btnShowMore.classList.add("hidden");
    }

    preparePage();
  };

  render();
  
  const showMore = () => {
    const btnShowMore = document.getElementById('Show more');
    if (btnShowMore != null) {
      btnShowMore.addEventListener('click', function() {  
        if (page < 3) {
          page += 1;
        }
        Home(page)  
      });
    }
  }

  showMore();

};

export { Home };
