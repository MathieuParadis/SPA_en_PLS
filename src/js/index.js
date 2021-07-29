import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip, Toast, Popover } from 'bootstrap';
import '../sass/style.scss';


import { Home } from './Home';
import { PageDetail } from './PageDetail';
import { PageList } from './PageList';
import { routes } from './routes';

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

const searchGame = () => {
  const input = document.getElementById('searchbar-input');
  input.addEventListener('keydown', function() {          
    if (event.keyCode == 13) {
        let gameToSearch = input.value
        gameToSearch = gameToSearch.replace(/\s+/g, "-")
        window.location.href = `#pagelist/${gameToSearch}`;
      }          
  });
};

const backHomepage = () => {
  const home = document.getElementById('home');
  home.addEventListener('click', function() {          
    Home(1);       
  });
};


searchGame();
backHomepage();

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

