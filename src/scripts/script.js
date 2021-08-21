import api from "./api.js";

const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("searchTeam");
const containerCards = document.getElementById("container-cards");
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  const valueSearch = inputSearch.value;
  const typeSearch = inputSearch.getAttribute("name");
  let reqResp;
  containerCards.innerHTML = "";
  if (typeSearch === "player") {
    //pesquisa jogador
    reqResp = await apiSearchTeam(`searchplayers.php?p=${valueSearch}`);
    reqResp.player.map((player) => cardPlayer(player)).join("");
  } else {
    //pesquisa Time
    reqResp = await apiSearchTeam(`searchteams.php?t=${valueSearch}`);
    reqResp.teams.map((teams) => cardTeam(teams)).join("");
  }
});

function apiSearchTeam(str) {
  const respAxios = api.get(str).then((response) => {
    return response.data;
  });
  return respAxios;
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
  logo="${strCutout ? strCutout : "https://i.pinimg.com/originals/a7/f0/0e/a7f00eaf0b4456c56797db82781e5e6f.png"}"
  sport="${strSport}"
  league="${strTeam}"
  ></card-search>`;
  containerCards.appendChild(node);
}
