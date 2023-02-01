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

const convertSongDuration = (seconds) => {
  let minutes = ~~(seconds / 60);
  let extraSeconds = seconds % 60;
  let stringSeconds = extraSeconds.toString();

  if (stringSeconds.length == 1) {
    return minutes + ":" + "0" + extraSeconds;
  } else {
    return minutes + ":" + extraSeconds;
  }
};

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours == 0) {
    return minutes + " min " + seconds + " sec";
  } else {
    return hours + " hr " + minutes + " min " + seconds + " sec";
  }
}

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
  let annuncioAB = document.getElementById("annuncioAB");

  let album = await fetchAlbum(id);
  let lunghezzaData = album.tracks.data;

  annuncioAB.innerHTML += `
  <div class="p-3">
  <img
    id="albumImage"
    src="${album.cover_big}"
    alt="Album cover"
  />
</div>
<div id="wrapperAnnuncioAB">
  <h5 class="albumAnnuncio">ALBUM</h5>
  <div class="songAuthor">
    <h1 id="albumName">${album.title}</h1>
    <div id="albumCredits">
      <img
        id="artistImage"
        src="${album.artist.picture}"
        alt="Artists photo"
      />
      <p id="albumAuthor"><a href="./artistPage.html?id=${album.artist.id}">${album.artist.name
    }</a></p>
      <span class="dot">•</span>
      <p id="albumYear">${album.release_date.slice(0, -6)}</p>
      <span class="dot">•</span>
      <p id="albumTracks">${album.nb_tracks + " songs"}</p>
      <p id="albumLength">${", " + toHoursAndMinutes(album.duration)}</p>
    </div>
  </div>

  <div class="btnContainer"></div>
</div>`;

  for (let i = 0; i < lunghezzaData.length; i++) {
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
      <p>${convertSongDuration(lunghezzaData[i].duration)}</p>
    </div>
  </div>`;
  }
};

drawAlbumPage();
