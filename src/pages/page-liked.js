import {getFavorites, addFavorite, removeFavorite, isFavorite} from '../favorites.js'

customElements.define(
    //on définit l'élément à construire, et la classe qui va le construire
  "page-liked",
  class extends HTMLElement {
    //connectedCallback pour appeler automatiquement la fonction quand l'élément est ajouté au DOM
        connectedCallback() {
            //innerHTML initial
            this.innerHTML = `
            <div id="liked-container">
            </div>
            `;
        
            const container = this.querySelector('#liked-container');
            //On va chercher les favorites, puis on crée une liste similaire à celle des artists-songs.
                getFavorites().forEach((fav) => {
                    const favElement = document.createElement('song-item');
                    favElement.setAttribute('favorite', isFavorite(fav));
                    favElement.setAttribute('href', fav.audio_url);
                    favElement.setAttribute('title', fav.title);
                    container.appendChild(favElement);

                    //Gestion de l'event custom favorite_click qui est dans song-iem
                    favElement.addEventListener('favorite_click', () => {
                        if(isFavorite(fav)){
                            removeFavorite(fav);
                            favElement.setAttribute('favorite', false)
                            //On enlève directement l'élément du DOM.
                            favElement.remove()
                            console.log('unliked!')
                        }else{
                            addFavorite(fav);
                            favElement.setAttribute('favorite', true)
                            console.log('liked!')
                        }
                    })
                }); 
        }
    },
);

