const albumIds = [
  75621062, 8887733, 7823038, 7824595, 7824584, 91333612, 345755977,
  192529232, 100674742, 59853252,
];

// shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// shuffle the albumIds array
shuffleArray(albumIds);

const selectedAlbumIds = albumIds.slice(0, 5);

const baseAlbumUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/";

// function per fetchare il album data per ogni id
const fetchAlbum = async (id) => {
  try {
    const res = await fetch(`${baseAlbumUrl}${id}`);
    if (!res.ok) {
      throw new Error(`Fetch failed with status code ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// array vuoto per fetchare albums

const albums = [];

// function per fetch data album
const getAlbums = async (id) => {
  const album = await fetchAlbum(id);
  albums.push(album);
  renderAlbums(albums);
};
export default albums

// function per fare il render in html
const renderAlbums = (albums) => {
  const divBuonasera = document.getElementById("ultimiAscoltiWrapper");
  const divAltro = document.getElementById("consigliatiWrapper");

  if (albums.length === 5) {
    for (let i = 0; i < albums.length; i++) {
      divAltro.innerHTML += `
        <div class="p-2">
          <div class="col custCard">
            <img src="${albums[i].cover_big}" />
            <div>
              <h4>${albums[i].artist.name}</h4>
              <h5>${albums[i].title}</h5>
            </div>
          </div>
        </div>
      `;
    }
  }
};

// chiama getAlbums function per  ogni selected album id
selectedAlbumIds.forEach(getAlbums);
