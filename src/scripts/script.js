import api from "./api.js";

const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("searchTeam");
const containerCards = document.getElementById("container-cards");
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  const valueSearch = inputSearch.value;
  const typeSearch = inputSearch.getAttribute("name");
  containerCards.innerHTML = "";
  if (typeSearch === "player") {
    //pesquisa jogador
    search(
      "player",
      `searchplayers.php?p=${valueSearch}`,
      `Não encontramos nenhum atleta chamdo: "${valueSearch}"`,
      cardPlayer
    );
  } else {
    //pesquisa Time
    search(
      "teams",
      `searchteams.php?t=${valueSearch}`,
      `Não encontramos nenhum time chamdo: "${valueSearch}"`,
      cardTeam
    );
  }
});

function apiSearchTeam(str) {
  const respAxios = api.get(str).then((response) => {
    return response.data;
  });
  return respAxios;
}

async function search(option, searchUrl, erroMessage, fn) {
  const reqResp = await apiSearchTeam(searchUrl);
  reqResp[option]
    ? reqResp[option].map((player) => fn(player))
    : (containerCards.innerHTML = `<span></span>
    <h2>
      ${erroMessage}
    </h2>`);
}

function cardTeam({ strTeamBadge, strTeam, strSport, idTeam, strLeague }) {
  const node = document.createElement("a");
  node.setAttribute("href", `../pages/info.html?id=${idTeam}`);
  node.innerHTML = `<card-search  
  team="${strTeam}"
  logo="${strTeamBadge}"
  sport="${strSport}"
  league="${strLeague}"
  ></card-search >`;
  containerCards.appendChild(node);
}

function cardPlayer({ strCutout, strPlayer, strSport, idPlayer, strTeam }) {
  const node = document.createElement("a");
  node.setAttribute("href", `../pages/infoPlayer.html?id=${idPlayer}`);
  node.innerHTML = `<card-search 
  team="${strPlayer}"
  logo="${
    strCutout
      ? strCutout
      : "https://i.pinimg.com/originals/a7/f0/0e/a7f00eaf0b4456c56797db82781e5e6f.png"
  }"
  sport="${strSport}"
  league="${strTeam}"
  ></card-search>`;
  containerCards.appendChild(node);
}
