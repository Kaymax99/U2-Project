// Getting the values received through the URL queryString
const url = window.location.href;
// Extract 'searchParams' from the URL
const searchParams = new URL(url).searchParams;
// Create a new URL searchParams with the datas recieved
const entries = new URLSearchParams(searchParams).entries();

const valuesArray = Array.from(entries);
const correctArray = valuesArray[0];
const id = correctArray[1];

const baseAlbumURL = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const fetchAlbum = async (index) => {
  try {
    let res = await fetch(baseAlbumURL + index);
    if (res.ok) {
      let data = await res.json();
      return data;
    } else {
      throw "errore nella sezione altro";
    }
  } catch (err) {
    console.log(err);
  }
};

const drawAlbumPage = async () => {
  let trackList = document.getElementById("trackListContainer");
  let album = await fetchAlbum(id);
  let lunghezzaData = album.tracks.data;
  console.log(lunghezzaData);

  //   for (let i = 0; i < lunghezzaData.length; i++) {}

  //   let song = data.tracks.data[i].title;
};
