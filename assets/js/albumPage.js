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
  let albumNavContainer = document.getElementById("pageContentNav");
  let albumNavName = document.getElementById("pageContentName");

  let album = await fetchAlbum(id);
  let lunghezzaData = album.tracks.data;

  albumNavName.innerText = album.title;
  annuncioAB.innerHTML += `
  <div class="p-3 mt-3 mt-md-0">
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
    <div id="albumCredits" class="d-block d-md-flex">
      <div class="d-flex align-items-center">
        <img
          id="artistImage"
          src="${album.artist.picture}"
          alt="Artists photo"
        />
        <p id="albumAuthor"><a href="./artistPage.html?id=${album.artist.id}">${
    album.artist.name
  }</a></p>
      </div>
      <div id="albumDetails" class="d-flex">
        <span class="dot">•</span>
        <p class="d-md-none">Album</p>
        <span class="dot d-md-none">•</span>
        <p id="albumYear">${album.release_date.slice(0, -6)}</p>
        <div class="d-none d-md-flex">
          <span class="dot">•</span>
          <p id="albumTracks">${album.nb_tracks + " songs"}</p>
          <p id="albumLength">${", " + toHoursAndMinutes(album.duration)}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="btnContainer"></div>
</div>`;

  for (let i = 0; i < lunghezzaData.length; i++) {
    trackList.innerHTML += `<div class="row albumSongItem">
    <div class="row col-11 col-md-6 firstItem">
      <p class="d-none d-md-flex p-0">${i + 1}</p>
      <div class="col">
        <h3 class="ellipsis">${lunghezzaData[i].title}</h3>
        <p class="ellipsis">${lunghezzaData[i].artist.name}</p>
      </div>
    </div>
    <div class="col col-3 d-none d-md-flex listens">
      <p>${lunghezzaData[i].rank}</p>
    </div>
    <div class="col col-3 ps-3 d-none d-md-flex length">
      <p>${convertSongDuration(lunghezzaData[i].duration)}</p>
    </div>
    <div class="col col-1 d-md-none d-flex justify-content-end">
      <i class="bi bi-three-dots-vertical"></i>
    </div>
    </div>`;

    // Color Thief logic
    const art = document.querySelector("#albumImage");
    /* console.log(art.src); */

    // initialize colorThief
    const colorThief = new ColorThief();
    // get the image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = art.src;
    /* console.log(img); */

    img.addEventListener("load", function () {
      /* console.log(img); */
      colorThief.getColor(img);

      /* console.log(img.src) */
      // get the background element
      let background = document.querySelector("#mainNav");
      let background2 = document.querySelector("#annuncioAB");

      // get color palette
      let color = colorThief.getColor(img);
      // set the background color
      background.style.backgroundColor = "rgb(" + color + ")";
      background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;
      background2.style.backgroundColor = "rgb(" + color + ")";
      background2.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;

      const main = document.querySelector("main");

      const changeNav = () => {
        let scrollValue = main.scrollTop;
        /* console.log(scrollValue); */
        if (scrollValue == 0) {
          background.style.backgroundColor = `rgba(${color}, 0)`;
        }
        if (scrollValue >= 100) {
          background.style.backgroundColor = `rgba(${color}, 0.5)`;
        }
        if (scrollValue >= 150) {
          background.style.backgroundColor = `rgba(${color}, 1)`;
        }
        if (scrollValue < 300) {
          albumNavContainer.style.opacity = "0%";
        }
        if (scrollValue >= 250) {
          albumNavContainer.style.opacity = "100%";
        }
      };
      main.addEventListener("scroll", changeNav);
    });
  }
};
drawAlbumPage();
