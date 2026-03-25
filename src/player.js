//accéder à l'élement audio-player du html
//fonctions à implémenter :
// play, pause, next, previous

//Récupérer le player audio du HTML
const player = document.getElementById('audio-player');
let currentSongList = [];
let currentSong = null;

//Cette méthode n'est pas utilisée quand une chanson est déjà en cours. Elle est seulement utilisée depuis page-artists-cover, pour lancer
//une nouvelle liste complète. La gestion du play on/off est faite dans page-player.js.
const playSong = (song, songs) => {
    //On définit que la musique actuelle est celle passée en paramètre
    currentSong = song;
    // si un tableau est transmis, on le met à jour. Cela nous permet d'utiliser juste playSong(song) à l'interne,
    // sans devoir le repasser à chaque fois (depuis previous/next, par exemple)
    //On vérifie d'abord que l'argument est passé, sinon il se fera écraser avec undefined.
    if(songs)
        currentSongList = songs;
    //On définit que la source (url) du player est l'url audio de la musique passée en paramètre
    player.src = song.audio_url;
    player.play();
}

const playNextSong = () => {
    //Définir l'index de la prochaine musique
    let nextSongIndex = currentSongList.indexOf(currentSong) + 1;

    // On s'assure qu'on n'arrive jamais en dehors du tableau et on reboucle sur le début
  if (nextSongIndex == currentSongList.length)
    nextSongIndex = 0

   playSong(currentSongList[nextSongIndex]);
}

const playPreviousSong = () => {
    //Définir l'index de la musique précédente
    let previousSongIndex = currentSongList.indexOf(currentSong) - 1;

    // On s'assure qu'on n'arrive jamais en dehors du tableau et on reboucle sur le début
    if (previousSongIndex == -1)
    previousSongIndex = currentSongList.length - 1

   playSong(currentSongList[previousSongIndex]);
}

//Loi de déméter : pour permettre aux voisins directs de communiquer.
const getCurrentSong = () => {
    return currentSong;
} 

export { playSong, playNextSong, playPreviousSong, getCurrentSong };