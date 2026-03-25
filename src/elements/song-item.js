

//Définir un élément custom, peut ensuite être utilisé comme n'importe quelle balise native
//Ici, on définit l'élément "song-item", qui est un micro-composant (une seule chanson dans une liste)
customElements.define(
  "song-item",
  class extends HTMLElement {
    //Permet de définir les attributs qui doivent être vérifiés à chaque changement.
    //Seraient ignorés sinon.
    static observedAttributes = ["favorite", "href", "title"];

    //Lifecycle hook, s'exécute automatiquement quand l'élément est inséré dans le DOM
    //Se met à jour avec render()
    connectedCallback() {
      this.render();
    }

    //Déclenché quand un attribut change de valeur
    //Se met à jour avec render()
    attributeChangedCallback() {
      this.render();
    }

    //Mise à jour de l'attribut
    render() {
      //définir si la chanson est liked ou non
        const liked = this.getAttribute("favorite") == "true" ? "favorite" : "not_favorite";
        //On construit ensuite le HTML
        this.innerHTML = `
          <div class="list-song-title">${this.getAttribute('title')}</div>
          <div class="action-list">
              <button type="button" class="favorite-button">
              <p>like</p>
              </button>
              <button type="button" class="play-button">
              <p>play</p>
              </button>
          </div>
          `

        const favButton = this.querySelector('.favorite-button');
        favButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent('favorite_click', {
              //C'est pas song-item qui va gérer l'event, c'est page-artists-song. 
              //Song-item n'a qu'a émettre l'évènement.
              //Donc rien besoin de mettre dans detail.
              detail : {},
              bubbles : true
            }))
        })
    }
  },
);
