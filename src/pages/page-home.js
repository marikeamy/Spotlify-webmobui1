customElements.define("page-home", class extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <h1 class="hero">Bienvenue!</h1>
            <p>Bonne visite :)</p>
        `
    }
})