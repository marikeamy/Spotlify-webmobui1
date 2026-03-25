import '../elements/artist-cover.js'
import { getArtists } from '../api.js'

customElements.define(
  "page-artists",
  class extends HTMLElement {

    //On a pas besoin de render ici parce que page-artists reçoit pas d'attributs qui changent,
    //donc pas de vérification à faire à chaque changement d'attribut.
     async connectedCallback() {
        //innerHTML initial
      this.innerHTML = `
        <div id="artists-container">
        </div>
      `;

      //On récupère le container, puis on va chercher chaque artiste, créer une carte
      //pour chaque artiste à partir de l'élément créé dans artist-cover.js,
      //on lui donne les attributs correspondans au chemin de l'API, et on l'ajoute au container.
      const container = this.querySelector('#artists-container');
      const searchInput = document.createElement('search-bar');
      const artists = await getArtists();

      const renderArtists = (artists) =>
          artists.forEach((artist) => {
              const cover = document.createElement('artist-cover');
              cover.setAttribute('cover', artist.image_url);
              cover.setAttribute('title', artist.name);
              cover.setAttribute('artist-id', artist.id);
              container.appendChild(cover);
          });
        container.appendChild(searchInput);

        searchInput.addEventListener('search', (e) => {
            container.innerHTML= '';
            const filteredArtists = artists.filter((artist) => artist.name.toLowerCase().includes(e.detail.query.toLowerCase()));
            renderArtists(filteredArtists);
            container.appendChild(searchInput);
        })

        //Appel de chargement initial
        renderArtists(artists);
     }
    },
);
