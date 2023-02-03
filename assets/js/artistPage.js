// Getting the values received through the URL queryString
const url = window.location.href;
// Extract 'searchParams' from the URL
const searchParams = new URL(url).searchParams;
// Create a new URL searchParams with the datas recieved
const entries = new URLSearchParams(searchParams).entries();

const valuesArray = Array.from(entries);
const correctArray = valuesArray[0];
const id = correctArray[1];

const baseAlbumURL =
  "https://striveschool-api.herokuapp.com/api/deezer/artist/";

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

const num = Math.floor(Math.random() * 16) + 1;

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

const fetchTopSongs = async (index) => {
  try {
    let res = await fetch(index);
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

drawArtistPage = async () => {
  let artistBanner = document.getElementById("annuncioAR");
  let monthlyListeners = document.getElementById("monthlyListeners");
  let artistMini = document.getElementById("artistMini");
  let albumNavContainer = document.getElementById("pageContentNav");
  let albumNavName = document.getElementById("pageContentName");
  let asideSongTextContainer = document.getElementById(
    "asideSongTextContainer"
  );

  let artist = await fetchAlbum(id);

  albumNavName.innerText = artist.name;
  artistBanner.style.backgroundImage = `url('${artist.picture_xl}')`;
  artistBanner.innerHTML += `
  <h1 id="artistName">${artist.name}</h1>
  <p class="d-none d-md-block">
    <span id="monthlyListeners">${artist.nb_fan}</span> ascoltatori mensili
  </p>
  `;
  monthlyListeners.innerHTML = `${artist.nb_fan} ascoltatori mensili`;

  let songs = await fetchTopSongs(artist.tracklist);
  let songsLength = songs.data;
  /* console.log(songsLength); */
  /* console.log(songsLength.length); */
  let songList = document.getElementById("songList");
  for (let i = 0; i < songsLength.length; i++) {
    songList.innerHTML += `
  <div id="songContainer" class="row">
    <div class="songData col-11 col-md-8">
      <p>${i + 1}</p>
      <img src="${songsLength[i].album.cover_small}" alt="album cover" />
      <p>${songsLength[i].title}</p>
    </div>
    <div class="col col-2 d-none d-md-flex listens justify-content-end">
    <p class="d-none d-md-block">${songsLength[i].rank}</p>
    </div>
   <div class="col col-2 ps-3 d-none d-md-flex length justify-content-end">
    <p class="d-none d-md-block">${convertSongDuration(
      songsLength[i].duration
    )}</p>
    </div>
    <div class="col col-1 d-md-none d-flex justify-content-end">
    <div class="dropdown">
  <button class="dropdown-toggle songDrpDwn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="bi bi-three-dots-vertical"></i>
  </button>
  <ul class="dropdown-menu songDropdown">
    <li><a class="dropdown-item" href="#"><i class="bi bi-heart pe-2"></i><span class="TestWhite">Mi piace</span></a></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-dash-circle pe-2"></i><span class="TestWhite">Nascondi canzone</span></a></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-music-note-list pe-2"></i><span class="TestWhite">Aggiungi a Playlist</span></a></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-person-lines-fill pe-2"></i><span class="TestWhite">Aggingi alla coda</span></a></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-person-heart pe-2"></i><span class="TestWhite">Visualizza Artista</span></a></li>
    <li><a class="dropdown-item" href="#"><i class="bi bi-share pe-2"></i><span class="TestWhite">Condividi</span></a></li>
  </ul>
  </div>
  </div>
  </div>
  `;
  }
  asideSongTextContainer.innerHTML = `
  <h3> Hai messo Mi piace a ${num} brani</h3>
  <p class="m-0">di ${artist.name}</p>
  `;
  artistMini.innerHTML = `
  <img
    src="${artist.picture_medium}"
    alt="artist photo"
  />
  `;

  const article = document.querySelector("#annuncioAR");
  const style = article.style.backgroundImage;
  const urlStart = style.indexOf("url") + 4;
  const urlEnd = style.indexOf("", urlStart);
  const urlwithcomas = style.substring(urlStart, urlEnd);
  let url = urlwithcomas.slice(1, -1);

  // initialize colorThief
  const colorThief = new ColorThief();
  // get the image
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  /*   console.log(img); */

  img.addEventListener("load", function () {
    /*     console.log(img); */
    colorThief.getColor(img);

    /* console.log(img.src) */
    // get the background element
    let background = document.querySelector("#mainNav");

    // get color palette
    let color = colorThief.getColor(img);
    /* console.log(color); */

    // set the background color
    background.style.backgroundColor = "rgb(" + color + ")";
    /* background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`; */

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
      if (scrollValue < 150) {
        albumNavContainer.style.opacity = "0%";
      }
      if (scrollValue >= 150) {
        background.style.backgroundColor = `rgba(${color}, 1)`;
        albumNavContainer.style.opacity = "100%";
      }
    };

    main.addEventListener("scroll", changeNav);
  });
};

drawArtistPage();
// Color Thief logic

// const art = document.querySelector("#annuncioAR")
// console.log(art);
// // initialize colorThief
// const colorThief = new ColorThief();
// // get the image
// const img = new Image();
// img.crossOrigin = "Anonymous";
// img.style = art.style;
// console.log(img);

// img.addEventListener("load", function () {
//   colorThief.getColor(img);

//   /* console.log(img.src) */
//   // get the background element
//   let background = document.querySelector("#mainNav");

//   // get color palette
//   let color = colorThief.getColor(img);
//   // set the background color
//   background.style.backgroundColor = "rgb(" + color + ")";
//   background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;

// })
