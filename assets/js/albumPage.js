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
  let durationSeconds = lunghezzaData.duration;

  for (let i = 0; i < lunghezzaData.length; i++) {
    function convertStoMs(seconds) {
      let minutes = ~~(seconds / 60);
      let extraSeconds = 0 + (seconds % 60);
      let stringSeconds = extraSeconds.toString();
      console.log(stringSeconds.length);
      if (stringSeconds.length == 1) {
        return minutes + ":" + "0" + extraSeconds;
      } else {
        return minutes + ":" + extraSeconds;
      }
    }

    trackList.innerHTML += `<div class="row albumSongItem">
    <div class="col col-6 firstItem">
      <p>${i + 1}</p>
      <div>
        <h3>${lunghezzaData[i].title}</h3>
        <p>${lunghezzaData[i].artist.name}</p>
      </div>
    </div>
    <div class="col col-3 listens">
      <p>${lunghezzaData[i].rank}</p>
    </div>
    <div class="col col-3 length">
      <p>${convertStoMs(lunghezzaData[i].duration)}</p>
    </div>
  </div>`;
  }
};

drawAlbumPage();
// let song = data.tracks.data[i].title;
