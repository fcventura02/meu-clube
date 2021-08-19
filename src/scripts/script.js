import api from "./api.js";

const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("searchTeam");
const containerCards = document.getElementById("container-cards");
formSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  const teamSearch = inputSearch.value;
  const teamResp = await apiSearchTeam(teamSearch);
  containerCards.innerHTML = ""
  teamResp.teams.map(
    ({ strTeamBadge, strTeam, strSport, idTeam, strLeague }) => {
      const node = document.createElement("a")
      node.setAttribute('href', `../pages/info.html?id=${idTeam}`)
      node.innerHTML = `<card-team 
      team="${strTeam}"
      logo="${strTeamBadge}"
      sport="${strSport}"
      league="${strLeague}"
      ></card-team>`
      containerCards.appendChild(node);
    }
  ).join('');
});

function apiSearchTeam(team) {
  const respAxios = api.get(`searchteams.php?t=${team}`).then((response) => {
    return response.data;
  });
  return respAxios;
}
