import { playNextSong, playPreviousSong, getCurrentSong} from '../player.js';

customElements.define(
  "page-player",
  class extends HTMLElement {

    //On a pas besoin de render ici parce que page-player reçoit pas d'attributs qui changent,
    //donc pas de vérification à faire à chaque changement d'attribut.
     connectedCallback() {
        
        //Gestion s'il n'y pas de musique lancée pour le moment.
        if(getCurrentSong() == null) {
          const message = document.createElement('p');
          message.textContent = "Pas de musique en cours";
          this.appendChild(message);
          return;
        }
        
      //On récupère le container, puis on crée chaque élément du player.
      //on lui donne les attributs correspondans au chemin de l'API, et on l'ajoute au container.
      const player = document.querySelector('#audio-player')
        const cover = document.createElement('artist-cover');
            cover.setAttribute('cover', getCurrentSong().artist.image_url);
            cover.setAttribute('title', getCurrentSong().artist.name);
        const playBtn = document.createElement('button');
            playBtn.setAttribute('active', 0);
            playBtn.setAttribute('type', 'button')
        const nextBtn = document.createElement('button');
            nextBtn.setAttribute('type', 'button')
        const previousBtn = document.createElement('button');
            previousBtn.setAttribute('type', 'button')

        //On reconstruit pas d'élément audio ici, parce qu'on le crée dans le HTML (singleton)
        //Attention, appendChild ne prend qu'un seul élément.
        //On appendChild sur le this, qui est l'élément entier, ici la page-player.js.
        this.appendChild(cover);
        this.appendChild(playBtn);
        this.appendChild(nextBtn);
        this.appendChild(previousBtn);

        playBtn.addEventListener("click", (e) => {
          //Ne pas mettre getCurrentSong().play() ici. getCurrentSong() retourne l'objet de la musique en cours, donc il n'a pas de méthode play() native.
          //paused ici est une propriété de audio, pas une méthode.
          if(player.paused) {
            player.play();
          }else {
            player.pause();
          }
        })

        nextBtn.addEventListener("click", (e) => {
          playNextSong();
        })

        previousBtn.addEventListener("click", (e) => {
          playPreviousSong();
        })
     }
    },
); 