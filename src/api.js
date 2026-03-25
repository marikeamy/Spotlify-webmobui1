let BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com';
//Aller fetch l'URL + endpoint (paramètre url)
const fetchJson = (url) => fetch(`${BASE_URL}${url}`).then((response) => response.json());
const getArtists = () => fetchJson(`/api/artists`);
const getArtistSongs = (id) => fetchJson(`/api/artists/${id}/songs`);
export { getArtists, getArtistSongs }

