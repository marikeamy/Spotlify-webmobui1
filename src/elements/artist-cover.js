//Définir un élément custom, peut ensuite être utilisé comme n'importe quelle balise native
//Ici, on définit l'élément "artist-cover", qui est un micro-composant (une seule carte)
customElements.define(
  "artist-cover",
  class extends HTMLElement {
    //Permet de définir les attributs qui doivent être vérifiés à chaque changement.
    //Seraient ignorés sinon.
    static observedAttributes = ["cover", "title"];

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
      this.innerHTML = `
        <div class="artist-card">
          <a href="#artists/${this.getAttribute("artist-id")}"/>
          <img src="${this.getAttribute("cover")}" />
          <p class="artist-list-item-title">${this.getAttribute("title")}</p>
          </a>
        </div>
        `;
    }
  },
);
