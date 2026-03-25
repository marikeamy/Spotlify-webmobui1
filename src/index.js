
import './elements/artist-cover.js';
import './elements/song-item.js'
import './elements/search-bar.js'
import './pages/page-artists.js';
import './pages/page-artists-songs.js';
import './pages/page-player.js'
import './pages/page-home.js'
import './pages/page-liked.js'

//Le router permet d'écouter les changements d'URL et d'afficher le Web Componant correspondant à l'URL
const router = () => {
  const main = document.querySelector('main');
  //window.location.hash retourne une string qui contient un # a la fin d'un URL.
  //si il trouve pas, il choisit pas défaut "#home".
  //split('/') transforme la string en tableau, en séparant les éléments par des "/" pour trouver les musiques de l'artiste dans l'URL (ex: #artists/1).
  const hashs = (window.location.hash || '#home').split('/');

  if(hashs[0] === '#home') {
    //si le hash correpond, on affiche la page (le composant, d'ou les <>) qui correspond
    main.innerHTML = '<page-home />';
    //Si le hash correspond (avec le id de l'artiste), on affiche la page des musiques de l'artiste
  }else if (hashs[0] == '#artists' && hashs[1]) {
    main.innerHTML = `<page-artists-songs artist-id=${hashs[1]}/>`
    //Si le hash correspond (sans le id de l'artiste), on affiche la page des artistes
  }else if (hashs[0] == '#artists' && !hashs[1]) {
    main.innerHTML = '<page-artists />'
  }else if (hashs[0] == '#player') {
    main.innerHTML = '<page-player />'
  }else if (hashs[0] == '#liked') {
    main.innerHTML = '<page-liked />'
  }
}

window.addEventListener('hashchange', router)
//appel initial pour que quand on refresh la page ça fonctionne
router();

//Online et offline service worker
//Offline et Online sont des listeners natifs de document 
window.addEventListener('offline', (e) => document.body.classList.add('offline'));
window.addEventListener('online', (e) => document.body.classList.remove('offline'));

//Service worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/OneSignalSDKWorker.js')
}