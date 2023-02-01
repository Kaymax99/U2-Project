const baseAlbumURL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const spotlightAlbum = 120044;

const arrayIDAlbum = [
  75621062, 8887733, 7823038, 7824595, 7824584, 91333612, 345755977, 192529232,
  100674742, 59853252, 130678282,
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

shuffleArray(arrayIDAlbum);
const buonaseraAlbums = [...arrayIDAlbum.slice(0, 6)];
const selectedAlbumIDs = [...arrayIDAlbum.slice(6)];

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

const drawAnnuncio = async (album) => {
  let spotlightAlbum = await fetchAlbum(album);
  //console.log(spotlightAlbum);

  let annuncio = document.getElementById("annuncio");
  annuncio.innerHTML = "";

  annuncio.innerHTML += `<div class="p-3">
<img src="${spotlightAlbum.cover_big}" height="200px" />
</div>
<div id="wrapperAnnuncio">

<h5 class="albumAnnuncio">ALBUM</h5>
<button id="hideAnnuncio">nascondi annunci</button>
<div class="songAuthor">
<a href="/albumPage.html?id=${spotlightAlbum.id}" target="_blank">
  <h1>${spotlightAlbum.title}</h1></a>
  <a href="/artistPage.html?id=${spotlightAlbum.artist.id}" target="_blank">
  <h5>${spotlightAlbum.contributors[0].name}</h5></a>
</div>
<h5>Ascolta il nuovo singolo di ${spotlightAlbum.contributors[0].name}</h5>
<div class="btnContainer">
  <button class="btn btnAnnuncio playBtn">Play</button>
  <button class="btn btnAnnuncio saveBtn">Salva</button>
  <button class="btn moreBtn">
    <i class="bi bi-three-dots"></i>
  </button>
</div>
</div>`;
};
drawAnnuncio(120044);

const albumArray = [];
const getAlbums = async function (id, givenNumber) {
  let albums = await fetchAlbum(id);
  albumArray.push(albums);
  /* console.log(albumArray); */
  if (givenNumber === 5) {
    const selectedAlbums = [...albumArray.slice(6)];
    drawAlbum(selectedAlbums);
  }
  if (givenNumber === 6) {
    const buonaseraAlbums = [...albumArray.slice(0, 6)];
    drawAlbumBuonasera(buonaseraAlbums);
  }
};

const drawAlbumBuonasera = (albumArray) => {
  let divBuonasera = document.getElementById("ultimiAscoltiWrapper");

  if (albumArray.length == 6) {
    for (i = 0; i < albumArray.length; i++) {
      divBuonasera.innerHTML += `    
      <div class="row col-4 p-1">
        <a href="/albumPage.html?id=${albumArray[i].id}" target="_blank">
          <div class="p-0 custCardLG">
          <img src="${albumArray[i].cover_medium}" class="col-3 p-0" />
          <div class="col-9">${albumArray[i].title}</div>
          </div>
        </a>
      </div>`;
    }
  }
};

const drawAlbum = (albumArray) => {
  let divAltro = document.getElementById("consigliatiWrapper");

  if (albumArray.length == 5) {
    for (i = 0; i < albumArray.length; i++) {
      divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${albumArray[i].cover_big}" />
        <div>
        <a href="/albumPage.html?id=${albumArray[i].id}" target="_blank"><h4>${albumArray[i].title}</h4></a>
        <a href="/artistPage.html?id=${albumArray[i].contributors[0].id}" target="_blank"><h5>${albumArray[i].artist.name}</h5></a>
        </div>
      </div>
    </div>`;
    }
  }
};

const startDrawingAlbums = (albumArray, givenNumber) => {
  for (i = 0; i < albumArray.length; i++) {
    getAlbums(albumArray[i], givenNumber);
  }
};

window.onload = startDrawingAlbums(buonaseraAlbums, 6);
window.onload = startDrawingAlbums(selectedAlbumIDs, 5);

// let requestURL = `${baseAlbumURL} + ${spotlightAlbum.id}`;
// let request = new XMLHttpRequest(requestURL);
// request.open("GET", requestURL);
// request.responssType = "json";
// request.send();

// request.onload = function () {
//   const nameConst = request.response;
// };
