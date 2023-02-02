const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const arrayPlaylist = [
  "Playlist Alessandro",
  "Playlist Carlos",
  "Playlist Simone",
  "Playlist Vincenzo",
  "Hot Hits Italia",
  "Big on the internet",
  "Pop Rising",
  "Canzoni Tristi",
  "In tendenza",
  "Be The Young",
  "2021 lol",
  "Power Hits",
  "Gaming Playlist",
  "2010s Mix",
  "2000s Mix",
  "Happy Mix",
  "Moody Mix",
  "Metal Mix",
  "Adrenaline Workout",
  "Rise Up",
  "Rock Hard",
  "Metal Essentials",
  "Crash Course",
  "Best of Kickass Metal 2022",
  "Daily Mix 1",
  "Daily Mix 2",
];
shuffleArray(arrayPlaylist);

const drawPlaylists = () => {
  const playlistContainer = document.getElementById("playlists");
  playlistContainer.innerHTML = "";

  for (i = 0; i < arrayPlaylist.length; i++) {
    playlistContainer.innerHTML += `
    <li>${arrayPlaylist[i]}</li>
  `;
  }
};
drawPlaylists();
