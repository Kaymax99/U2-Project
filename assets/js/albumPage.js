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
    alt="Album cover" crossorigin="anonymous"
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

    // this code make the container del colore della imagine caricata dal api usando colorthief
    const art = document.querySelector("#albumImage")
    // initialize colorThief
    const colorThief = new ColorThief();
    // get the image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = art.src;
    img.addEventListener('load', function () {
      colorThief.getColor(img);

      console.log(img.src)
      // get the background element
      let background = document.querySelector("#mainNavB");
      let background2 = document.querySelector("#annuncioAB")

      // get color palette
      let color = colorThief.getColor(img);
      // set the background color
      background.style.backgroundColor = "rgb(" + color + ")";
      background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;
      background2.style.backgroundColor = "rgb(" + color + ")";
      background2.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;

    });



  }


}
drawAlbumPage();

