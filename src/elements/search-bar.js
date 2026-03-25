customElements.define('search-bar', class extends HTMLElement {
    
    connectedCallback() {
        this.innerHTML = `
        <div id="search-wrapper">
            <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />
        </div>
        `

        const searchInput = this.querySelector('#search-input');

        //On crée pas juste un eventlistener qui change le hash ici, parce que si un jour on veut
        //utiliser la barre de search ailleurs, on dois modifier le router.
        //(crée une dépendance entre search-bar et le router).
        //Donc on crée un event customEvent.
        //On lui donne une conditio
        searchInput.addEventListener('keydown', (e) => {
            if(e.key === "Enter"){
            this.dispatchEvent(new CustomEvent('search', {
                detail: {query : searchInput.value}, //on récupère ici la donnée pour la retransmettre à qui on veut ensuite
                bubbles: true
            }));
        }
    });
    }
});