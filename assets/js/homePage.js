const baseAlbumURL = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const spotlightAlbum = 120044;

const arrayIDAlbum = [
  75621062, 8887733, 7823038, 7824595, 7824584, 91333612, 345755977, 192529232,
  100674742, 59853252, 130678282,
];

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
  //   annuncio.innerHTML = "";

  annuncio.innerHTML += `
  <div class="p-3">
    <img src="${spotlightAlbum.cover_big}" height="200px" />
  </div>
  <div id="wrapperAnnuncio">

    <h5 class="albumAnnuncio">ALBUM</h5>
    <button id="hideAnnuncio">nascondi annunci</button>
    <div class="songAuthor">
      <a href="./albumPage.html?id=${spotlightAlbum.id}">
      <h1>${spotlightAlbum.title}</h1>
      </a>
      <a href="./artistPage.html?id=${spotlightAlbum.artist.id}">
      <h5>${spotlightAlbum.contributors[0].name}</h5>
      </a>
    </div>
    <h5>Ascolta il nuovo album di ${spotlightAlbum.contributors[0].name}</h5>
    <div class="btnContainer">
      <button class="btn btnAnnuncio playBtn">Play</button>
      <button class="btn btnAnnuncio saveBtn">Salva</button>
      <div class="dropdown1">
        <ul class="dopperRadius dropdown-content2">
        </ul>
        <button class="dropdown-toggle1 btn moreBtn">
        <i class="bi bi-three-dots"></i>
        </button>
        <ul class="dopperRadius dropdown-content1">
          <li><a class="topA" href="#">Add to queue</a></li>
          <li><a href="#">Go to playlist radio</a></li>
          <li><a href="#">Report</a></li>
          <li><a href="#">Add to your Library</a></li>
          <li>
            <hr>
          </li>
        <li><a class="botA" href="#">Share</a></li>
        <li>
          <hr>
        </li>
        <li><a href="">About recommendations</a></li>
        <li>
          <hr>
        </li>
        <li><a href="">Open in Desktop app</a></li>
      </ul>
    </div>
  </div>
</div>
`;

  // this code make all the buttons generated with the popups function

  const dropdownToggle = document.querySelector(".dropdown-toggle1 ");
  const dropdownContent = document.querySelector(".dropdown-content1");
  const dropdownContent2 = document.querySelector(".dropdown-content2");

  dropdownToggle.addEventListener("click", function () {
    if (dropdownContent.style.display === "block" && !active) {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !dropdownToggle.contains(event.target) &&
      dropdownContent.style.display === "block"
    ) {
      dropdownContent.style.display = "none";
    }
  });

  dropdownToggle.addEventListener("mouseover", function () {
    dropdownContent2.style.display = "block";
    document.addEventListener("mouseout", function () {
      dropdownContent2.style.display = "none";
    });
  });
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
    /* console.log("First Albums:", selectedAlbums); */
  }
  if (givenNumber === 6) {
    const buonaseraAlbums = [...albumArray.slice(0, 6)];
    drawAlbumBuonasera(buonaseraAlbums);
    /* console.log("Second Albums:", buonaseraAlbums); */
  }
};

const drawAlbumBuonasera = (albumArray) => {
  let divBuonasera = document.getElementById("ultimiAscoltiWrapper");

  if (albumArray.length == 6) {
    for (i = 0; i < albumArray.length; i++) {
      divBuonasera.innerHTML += `
      <div class="row col-4 p-1">
       <a href="./albumPage.html?id=${albumArray[i].id}" target="_blank">
         <div class="p-0 custCardLG">
           <img src="${albumArray[i].cover_medium}" class="col-3 p-0" />
           <div class="col-9 col-md-6">${albumArray[i].title}</div>
           <div class="col-md-3 d-none d-md-block cardButtonContainer">
              <button class="hoverCardButton" onclick="addToPlayer(${i})">
                <i class="fa-sharp fa-solid fa-play"></i>
              </button>
           </div>
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
      divAltro.innerHTML += `
        <div class="p-2">
          <div class="col custCard">
            <img src="${albumArray[i].cover_big}" />
            <a href="#">
              <button class="hoverCardButtonOthers" onclick="addToPlayer(${
                i + 6
              })">
                <i class="fa-sharp fa-solid fa-play"></i>
              </button>
            </a>
            <div>
              <a href="./albumPage.html?id=${albumArray[i].id}" target="_blank">
                <h4>${albumArray[i].title}</h4>
              </a>
              <a
                href="./artistPage.html?id=${albumArray[i].contributors[0].id}"
                target="_blank"
              >
                <h5>${albumArray[i].artist.name}</h5>
              </a>
            </div>
          </div>
        </div>
      `;
    }
    /*    divAltro.innerHTML += `<div class="p-2">
      <div class="col custCard">
        <img src="${albumArray[0].cover_big}" />
        <button class="hoverCardButtonOthers" onclick="addToPlayer(0)">
          <i class="fa-sharp fa-solid fa-play"></i>
        </button>
        <div>
          <a href="./albumPage.html?id=${albumArray[0].id}" target="_blank">
            <h4>${albumArray[0].title}</h4>
          </a>
          <a href="./artistPage.html?id=${albumArray[0].contributors[0].id}" target="_blank">
            <h5>${albumArray[0].artist.name}</h5>
          </a>
        </div>
      </div>
    </div>` */
  }

  // THIS IS THE COLOR THIEF LOGIC
  const art = document.querySelector(".p-3>img");
  /* console.log(art) */
  // initialize colorThief
  /* console.log("hi") */
  const colorThief = new ColorThief();
  // get the image
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = art.src;
  img.addEventListener("load", function () {
    colorThief.getColor(img);

    /* console.log(img.src) */
    // get the background element
    let background = document.querySelector("#mainNav");
    let background2 = document.querySelector("#annuncio");
    // get color palette
    let color = colorThief.getColor(img);
    // set the background color
    background.style.backgroundColor = `rgba(${color}, 0)`;
    /*     background.style.background = `linear-gradient(to bottom, rgb(${color}), transparent)`; */
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
    };
    main.addEventListener("scroll", changeNav);
  });
};

const addToPlayer = (index) => {
  playerRowLeft = document.getElementById("playerRowLeft");
  playerRowLeft.innerHTML = ``;
  playerRowLeft.innerHTML = `<div id="playerImgContainer">
  <img
    src="${albumArray[index].cover_medium}"
    alt=""
  />
</div>
<div id="playerName">
  <h5>${albumArray[index].artist.name}</h5>
  <p>${albumArray[index].title}</p>
</div>

<div class="d-flex justify-content-center gap-3">
  <i class="bi bi-heart"></i>
  <i class="bi bi-pip"></i>
</div>`;
};

const startDrawingAlbums = (albumArray, givenNumber) => {
  for (i = 0; i < albumArray.length; i++) {
    getAlbums(albumArray[i], givenNumber);
  }
};

window.onload = startDrawingAlbums(buonaseraAlbums, 6);
window.onload = startDrawingAlbums(selectedAlbumIDs, 5);

// window.addEventListener("load", () => {

//   const dropdownToggle = document.querySelector(".dropdown-toggle1");
//   const dropdownContent = document.querySelector(".dropdown-content1");
//   const dropdownContent2 = document.querySelector(".dropdown-content2")

//   dropdownToggle.addEventListener("click", function () {
//     if (dropdownContent.style.display === "block" && !active) {
//       dropdownContent.style.display = "none";
//     } else {
//       dropdownContent.style.display = "block";
//     }
//   });

//   document.addEventListener("click", function (event) {
//     if (!dropdownToggle.contains(event.target) && dropdownContent.style.display === "block") {
//       dropdownContent.style.display = "none";
//     }
//   });

//   dropdownToggle.addEventListener("mouseover", function () {
//     dropdownContent2.style.display = "block"
//     document.addEventListener("mouseout", function () {
//       dropdownContent2.style.display = "none"

//     })
//   })
//   console.log("helloooooooooo")
