import { playSong } from "../player";
//Page qui permet d'afficher les musiques d'un artiste
import { getArtistSongs } from '../api.js';
import {isFavorite, addFavorite, removeFavorite} from '../favorites.js'

customElements.define(
    //on définit l'élément à construire, et la classe qui va le construire
  "page-artists-songs",
  class extends HTMLElement {
    //connectedCallback pour appeler automatiquement la fonction quand l'élément est ajouté au DOM
        connectedCallback() {
            //innerHTML initial
            this.innerHTML = `
            <div id="artist-songs-container">
            </div>
            `;
        
            //On récupère l'id de l'artiste à partir de "artist-id" dans l'URL
            //Le this ici correspond à l'élément lui-même - toute la page -.
            //Donc la, il va chercher le premier artist-id qu'il trouve dans toute la page.
            const artistId = this.getAttribute('artist-id');
            const container = this.querySelector('#artist-songs-container');
            //On va chercher les musiques de l'artiste à partir de l'API, puis on crée une liste (qui sera la liste de lecture)
            //qui va afficher les musiques de l'artiste, avec un bouton like et un bouton play pour chaque musique.
            getArtistSongs(artistId).then((songs) => {
                songs.forEach((song) => {
                    const songElement = document.createElement('song-item');
                    songElement.setAttribute('favorite', isFavorite(song));
                    songElement.setAttribute('href', song.audio_url);
                    songElement.setAttribute('title', song.title);
                    container.appendChild(songElement);

                    //Gestion de l'event custom favorite_click qui est dans song-iem
                    songElement.addEventListener('favorite_click', () => {
                        if(isFavorite(song)){
                            removeFavorite(song);
                            songElement.setAttribute('favorite', false)
                            console.log('unliked!')
                        }else{
                            addFavorite(song);
                            songElement.setAttribute('favorite', true)
                            console.log('liked!')
                        }
                    })

                    //Cette partie vient gérer le lancement de la musique lorsqu'on appuie sur le bouton play
                    const playBtn = songElement.querySelector('.play-button');
                    playBtn.addEventListener('click', (e) => {
                        e.preventDefault;
                        //On lance la méthode de player.js qui lance la musique
                        playSong(song, songs)
                    })
                });
            });
            
            
        }
    },
);

