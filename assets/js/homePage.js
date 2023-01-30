const getMusic = async () => {
  try {
    let discografiaUltimiAscolti1 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaUltimiAscolti2 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaUltimiAscolti3 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaUltimiAscolti4 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaUltimiAscolti5 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    let discografiaUltimiAscolti6 = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
      {
        input: "GET",
      }
    );

    if (
      discografiaUltimiAscolti1.ok &&
      discografiaUltimiAscolti2.ok &&
      discografiaUltimiAscolti3.ok &&
      discografiaUltimiAscolti4.ok &&
      discografiaUltimiAscolti5.ok &&
      discografiaUltimiAscolti6.ok
    ) {
      let elencoUltimiAscolti1 = await discografiaUltimiAscolti1.json();
      let elencoUltimiAscolti2 = await discografiaUltimiAscolti2.json();
      let elencoUltimiAscolti3 = await discografiaUltimiAscolti3.json();
      let elencoUltimiAscolti4 = await discografiaUltimiAscolti4.json();
      let elencoUltimiAscolti5 = await discografiaUltimiAscolti5.json();
      let elencoUltimiAscolti6 = await discografiaUltimiAscolti6.json();

      let divUltimiAscolti = document.getElementById("ultimiAscoltiWrapper");

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti1.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti1.title}</div></div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti2.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti2.title}</div></div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti3.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti3.title}</div></div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti4.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti4.title}</div></div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti5.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti5.title}</div></div>`;

      divUltimiAscolti.innerHTML += `<div class="row col-4 p-1"><div class="p-0 custCardLG">
        <img src="${elencoUltimiAscolti6.cover_small}" class="col-3 p-0" />
        <div class="col-9">${elencoUltimiAscolti6.title}</div></div>`;
    } else {
      throw "errore nel primo in discografiaUltimiAscolti";
    }
  } catch (err) {
    console.log(err);
  }
};

getMusic();
