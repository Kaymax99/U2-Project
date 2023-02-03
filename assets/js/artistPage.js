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
  let asideSongTextContainer = document.getElementById(
    "asideSongTextContainer"
  );

  let artist = await fetchAlbum(id);
  artistBanner.style.backgroundImage = `url('${artist.picture_xl}')`;
  artistBanner.innerHTML += `
  <h1 id="artistName">${artist.name}</h1>
  <p>
    <span id="monthlyListeners">${artist.nb_fan}</span> ascoltatori mensili
  </p>
  `;

  let songs = await fetchTopSongs(artist.tracklist);
  let songsLength = songs.data;
  /* console.log(songsLength); */
  /* console.log(songsLength.length); */
  let songList = document.getElementById("songList");
  for (let i = 0; i < songsLength.length; i++) {
    songList.innerHTML += `
  <div id="songContainer">
    <div id="firstSongData" onclick="addToPlayer()">
      <p>${i + 1}</p>
      <img src="${songsLength[i].album.cover_small}" alt="album cover" />
      <p>${songsLength[i].title}</p>
    </div>
    <p>${songsLength[i].rank}</p>
    <p>${convertSongDuration(songsLength[i].duration)}</p>
  </div>
  `;
  }
  asideSongTextContainer.innerHTML = `
  <h3> Hai messo Mi piace a ${num} brani</h3>
  <p>di ${artist.name}</p>
  `;

  const article = document.querySelector("#annuncioAR");
  const style = article.style.backgroundImage;
  const urlStart = style.indexOf("url(") + 4;
  const urlEnd = style.indexOf(")", urlStart);
  const urlwithcomas = style.substring(urlStart, urlEnd);
  let url = urlwithcomas.slice(1, -1);

  console.log(url);

  // initialize colorThief
  const colorThief = new ColorThief();
  // get the image
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = url;
  console.log(img);

  img.addEventListener("load", function () {
    console.log(img);
    colorThief.getColor(img);

    /* console.log(img.src) */
    // get the background element
    let background = document.querySelector("#mainNav");

    // get color palette
    let color = colorThief.getColor(img);
    console.log(color);

    // set the background color
    background.style.backgroundColor = "rgb(" + color + ")";
    background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`;

    const main = document.querySelector("main");

    const changeNav = () => {
      const navBar = document.getElementById("mainNav");
      let scrollValue = main.scrollTop;
      /* console.log(scrollValue); */
      if (scrollValue == 0) {
        background.style.backgroundColor = `rgba(${color}, 0)`;
      }
      if (scrollValue >= 100) {
        background.style.backgroundColor = `rgba(${color}, 0.5)`;
      }
      if (scrollValue < 150) {
        albumNavName.style.opacity = "0%";
      }
      if (scrollValue >= 150) {
        background.style.backgroundColor = `rgba(${color}, 1)`;
        albumNavName.style.opacity = "100%";
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
