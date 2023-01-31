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
      /*       console.log(res);
      console.log(data); */
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
  console.log(spotlightAlbum);

  let annuncio = document.getElementById("annuncio");
  annuncio.innerHTML = "";

  annuncio.innerHTML += `<div class="p-3">
<img src="${spotlightAlbum.cover_big}" height="200px" />
</div>
<div id="wrapperAnnuncio">
<h5 class="albumAnnuncio">ALBUM</h5>
<button id="hideAnnuncio">nascondi annunci</button>
<div class="songAuthor">
  <h1>${spotlightAlbum.title}</h1>
  <h5>${spotlightAlbum.contributors[0].name}</h5>
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

const drawAlbum = (albumArray) => {
  let divAltro = document.getElementById("consigliatiWrapper");

  if (albumArray.length == 5) {
    for (i = 0; i < albumArray.length; i++) {
      divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${albumArray[i].cover_big}" />
        <div>
          <h4>${albumArray[i].title}</h4>
          <h5>${albumArray[i].artist.name}</h5>
        </div>
      </div>
    </div>`;
    }
  }
};

const drawAlbumBuonasera = (albumArray) => {
  let divBuonasera = document.getElementById("ultimiAscoltiWrapper");

  if (albumArray.length == 6) {
    for (i = 0; i < albumArray.length; i++) {
      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${albumArray[i].cover_small}" class="col-3 p-0" />
        <div class="col-9">${albumArray[i].title}</div></div>`;
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

/* const getMusic = async () => {
  try {
    //fetch sezione annuncio
    let discografiaAnnincio1 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    //fetch sezione "buonasera"
    let discografiaBuonasera1 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaBuonasera2 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaBuonasera3 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaBuonasera4 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaBuonasera5 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaBuonasera6 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    //fetch sezione "altro di ciò che ti piace"

    let discografiaAltro1 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=codingMode",
      {
        input: "GET",
      }
    );

    let discografiaAltro2 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=codingMode",
      {
        input: "GET",
      }
    );

    let discografiaAltro3 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=codingMode",
      {
        input: "GET",
      }
    );

    let discografiaAltro4 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=codingMode",
      {
        input: "GET",
      }
    );

    let discografiaAltro5 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/search?q=codingMode",
      {
        input: "GET",
      }
    );
    // sezione arrayCanzoni

    class DataSongsWID {
      constructor(target) {
        this.autore = autore;
        this.songsTitle = target.title;
        this.albumTitle = album;
        this.songAlbum = [
          { title, duration, rank },
          { title, duration, rank },
        ];
        this.picture = picture;
        this.pictureAlbum = pictureAlbum;
        this.duration = duration;
        this.fans = fans;
      }
    }

    //sezione annuncio
    if (discografiaAnnincio1.ok) {
      let elencoAnnuncio1 = await discografiaAnnincio1.json();

      let annuncio = document.getElementById("annuncio");

      annuncio.innerHTML += `<div class="p-3">
<img src="${elencoAnnuncio1.cover_small}" height="200px" />
</div>
<div id="wrapperAnnuncio">
<h5 class="albumAnnuncio">ALBUM</h5>
<button id="hideAnnuncio">nascondi annunci</button>
<div class="songAuthor">
  <h1>${elencoAnnuncio1.title}</h1>
  <h5>${elencoAnnuncio1.contributors[0].name}</h5>
</div>
<h5>Ascolta il nuovo singolo di ${elencoAnnuncio1.contributors[0].name}</h5>
<div class="btnContainer">
  <button class="btn btnAnnuncio playBtn">Play</button>
  <button class="btn btnAnnuncio saveBtn">Salva</button>
  <button class="btn moreBtn">
    <i class="bi bi-three-dots"></i>
  </button>
</div>
</div>`;
    } else {
      throw "errore nella sezione buonasera";
    }

    //sezione "buonasera"
    if (
      discografiaBuonasera1.ok &&
      discografiaBuonasera2.ok &&
      discografiaBuonasera3.ok &&
      discografiaBuonasera4.ok &&
      discografiaBuonasera5.ok &&
      discografiaBuonasera6.ok
    ) {
      let elencoBuonasera1 = await discografiaBuonasera1.json();
      let elencoBuonasera2 = await discografiaBuonasera2.json();
      let elencoBuonasera3 = await discografiaBuonasera3.json();
      let elencoBuonasera4 = await discografiaBuonasera4.json();
      let elencoBuonasera5 = await discografiaBuonasera5.json();
      let elencoBuonasera6 = await discografiaBuonasera6.json();

      let divBuonasera = document.getElementById("ultimiAscoltiWrapper");

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera1.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera1.title}</div></div>`;

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera2.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera2.title}</div></div>`;

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera3.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera3.title}</div></div>`;

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera4.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera4.title}</div></div>`;

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera5.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera5.title}</div></div>`;

      divBuonasera.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoBuonasera6.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoBuonasera6.title}</div></div>`;
    } else {
      throw "errore nella sezione buonasera";
    }

    //sezione "altro di ciò che ti piace"
    if (
      discografiaAltro1.ok &&
      discografiaAltro2.ok &&
      discografiaAltro3.ok &&
      discografiaAltro4.ok &&
      discografiaAltro5.ok
    ) {
      let elencoAltro1 = await discografiaAltro1.json();
      let musicAltro1 = elencoAltro1.data;
      let elencoAltro2 = await discografiaAltro2.json();
      let musicAltro2 = elencoAltro2.data;
      let elencoAltro3 = await discografiaAltro3.json();
      let musicAltro3 = elencoAltro3.data;
      let elencoAltro4 = await discografiaAltro4.json();
      let musicAltro4 = elencoAltro4.data;
      let elencoAltro5 = await discografiaAltro5.json();
      let musicAltro5 = elencoAltro5.data;

      let divAltro = document.getElementById("consigliatiWrapper");

      divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${musicAltro1[0].album.cover_big}" />
        <div>
          <h4>${musicAltro1[0].title}</h4>
          <h5>${musicAltro1[0].album.title}</h5>
        </div>
      </div>
    </div>`;

      divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${musicAltro2[0].album.cover_big}" />
        <div>
          <h4>${musicAltro2[0].title}</h4>
          <h5>${musicAltro2[0].album.title}</h5>
        </div>
      </div>
    </div>`;

      divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${musicAltro3[0].album.cover_big}" />
        <div>
          <h4>${musicAltro3[0].title}</h4>
          <h5>${musicAltro3[0].album.title}</h5>
        </div>
      </div>
    </div>`;

      divAltro.innerHTML += `<div class="p-2">
    <div class="col custCard">
      <img src="${musicAltro4[0].album.cover_big}" />
      <div>
        <h4>${musicAltro4[0].title}</h4>
        <h5>${musicAltro4[0].album.title}</h5>
      </div>
    </div>
  </div>`;

      divAltro.innerHTML += `<div class="p-2">
  <div class="col custCard">
    <img src="${musicAltro5[0].album.cover_big}" />
    <div>
      <h4>${musicAltro5[0].title}</h4>
      <h5>${musicAltro5[0].album.title}</h5>
    </div>
  </div>
</div>`;
    } else {
      throw "errore nella sezione altro";
    }
  } catch (err) {
    console.log(err);
  }
};

getMusic(); */
