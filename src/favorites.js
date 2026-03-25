/*LocalStorage : stockage clé-valeur dans le navigateur, persistant entre les refreshs. Il ne stocke que des strings. 
La clé est juste un identifiant choisi, pour retrouver la donnée. 

  localStorage.setItem('ma-cle', 'ma-valeur');  // écrire
  localStorage.getItem('ma-cle');               // lire → 'ma-valeur'                        
  localStorage.removeItem('ma-cle');            // supprimer    

  Comme il ne stocke que des strings, pour un tableau d'objets :  

  // Sauvegarder  
  localStorage.setItem('favorites', JSON.stringify([{id: 1, title: 'Song'}]));                                                                                                        
  // Lire   
  JSON.parse(localStorage.getItem('favorites'));  // → [{id: 1, title: 'Song'}]

*/

//la clé sous forme de constante
const FAVORITES_KEY = 'favorites';

// Helpers pour l'intéraction avec le localstorage en JSON
// setItem est la méthode localStorage qui permet d'écrire
// getItem est la méthode localStorage qui permet de lire
// On parse ici en JSON, parce que le stockage ne stocke que des strings.
const setItem = (id, value) => localStorage.setItem(id, JSON.stringify(value))
const getItem = (id) => localStorage.getItem(id) && JSON.parse(localStorage.getItem(id))

// Méthodes pour le maniement des favoris
// on lit la valeur en prenant toutes les valeurs correspondantes à notre clé,
// si rien, on retourne un tableau vide.
const getFavorites = () => getItem(FAVORITES_KEY) ?? []

const isFavorite = (song) => {
    //On vient trouver les id (el) qui correspondent aux id de la song passée en paramètre
    return getFavorites().find((el) => el.id === song.id ) 
}

const addFavorite = (song) => {
    const favs = getFavorites()
    favs.push(song);
    //On vient ensuite le set dans le localStorage
    setItem(FAVORITES_KEY, favs)
}

const removeFavorite = (song) => {
    const favs = getFavorites()
    const index = favs.findIndex((el) => el.id == song.id)
    favs.splice(index, 1)
    //On vient ensuite le set dans le localStorage
    setItem(FAVORITES_KEY, favs)
}

export {isFavorite, getFavorites, addFavorite, removeFavorite}