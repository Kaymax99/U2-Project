const getMusic = async () => {
  try {
    let discografiaUltimiAscolti = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    if (discografiaUltimiAscolti.ok) {
      let elencoUltimiAscolti = await discografiaUltimiAscolti.json();

      let divUltimiAscolti = document.getElementById("ultimiAscoltiWrapper");

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 rounded-1 border p-0">
        <img src="${elencoUltimiAscolti.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti.title}</div>`;
    } else {
      throw "errore nel primo in discografiaUltimiAscolti";
    }
  } catch (err) {
    console.log(err);
  }
};

getMusic();
