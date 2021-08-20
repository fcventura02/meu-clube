import api from "./api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idTeam = urlParams.get("id");
const teamLogo = document.getElementById("team-logo");
const teamInfo = document.getElementById("team-info");
const teamStadiumInfo = document.getElementById("team-stadium-info");
const teamStadiumImg = document.getElementById("team-stadium-img");
const teamDescription = document.getElementById("team-description");
const teamTeamGalery = document.getElementById("team-galery");
const teamTeamNetwork = document.getElementById("team-network");

idTeam === null
  ? notIdSerach(
      ` 
    <p><strong>Você não selecionou um time!</strong>
    <br>
    Você sera redirecionado para a pagina principal.</p>
  `
    )
  : searchInfoTeam();

function notIdSerach(info) {
  bootbox.alert(info, () => {
    window.location.href = "./index.html";
  });
}

async function searchInfoTeam() {
  try {
    const respAxios = await apiSearchTeam();
    const {
      strTeamBadge,
      strTeamJersey,
      strTeamLogo,
      strTeamFanart1,
      strTeamFanart2,
      strTeamFanart3,
      strTeamFanart4,
      strTeamBanner,
    } = respAxios.teams[0];
    createHeaderElementFromTeamInformation(respAxios.teams[0]);
    createElementWithTeamStadiumInformation(respAxios.teams[0]);
    createElementWithTeamDescription(respAxios.teams[0]);
    createElementWithGallery(
      strTeamBadge,
      strTeamJersey,
      strTeamLogo,
      strTeamFanart1,
      strTeamFanart2,
      strTeamFanart3,
      strTeamFanart4,
      strTeamBanner
    );
    createElementWithSocialNetworks(respAxios.teams[0]);
  } catch (error) {
    console.error(error);
    notIdSerach(`<h3>Não foi possivel acessar o time informado!</h3>`);
  }
}

function apiSearchTeam() {
  return api.get(`lookupteam.php?id=${idTeam}`).then((response) => {
    return response.data;
  });
}

function createHeaderElementFromTeamInformation({
  strTeamBadge,
  strTeam,
  strStadiumLocation,
  strCountry,
  strLeague,
  strSport,
}) {
  const h1 = document.createElement("h1");
  const span = document.createElement("span");
  const p = document.createElement("p");
  h1.innerHTML = `<h1>${strTeam}</h1>`;
  span.innerHTML = `<span>${strStadiumLocation} - ${strCountry}</span> <br>`;
  p.innerHTML = `<p> ${strLeague} - ${strSport}</p>`;
  teamLogo.innerHTML = `<img src="${strTeamBadge}" alt="logo ${strTeam}">`;
  teamInfo.appendChild(h1);
  teamInfo.appendChild(span);
  teamInfo.appendChild(p);
}

function createElementWithTeamStadiumInformation({
  strStadium,
  strStadiumDescription,
  strStadiumThumb,
  intStadiumCapacity,
}) {
  const h3 = document.createElement("h3");
  const span = document.createElement("span");
  const p = document.createElement("p");
  console.log(strStadium || intStadiumCapacity || strStadiumDescription)
  if (strStadium || intStadiumCapacity || strStadiumDescription) {
    h3.innerText =
      strStadium === null ? "Sem informação do nome estádio" : `${strStadium}`;
    span.innerText =
      intStadiumCapacity === null
        ? "Sem informação da capacidade do estádio"
        : `capacidade - ${intStadiumCapacity}`;
    p.innerText =
      strStadiumDescription === null
        ? "Sem Descrição do estádio"
        : `${strStadiumDescription}`;
    if (strStadiumThumb)
      teamStadiumImg.innerHTML = `<img src="${strStadiumThumb}" alt="estadio ${strStadium}">`;
    teamStadiumInfo.appendChild(h3);
    teamStadiumInfo.appendChild(span);
    teamStadiumInfo.appendChild(p);
  }
}

function createElementWithTeamDescription({
  strDescriptionEN,
  strDescriptionPT,
}) {
  const p = document.createElement("p");
  const description = strDescriptionPT ? strDescriptionPT : strDescriptionEN;
  p.innerText = `${description}`;
  teamDescription.appendChild(p);
}

function createElementWithGallery(...props) {
  for (const iterator of props) {
    if (iterator) {
      const img = document.createElement("img");
      const div = document.createElement("div");
      div.setAttribute("class", "carousel-item");
      img.setAttribute("src", iterator);
      div.appendChild(img);
      teamTeamGalery.appendChild(div);
    }
  }
}

function createElementWithSocialNetworks({
  strYoutube,
  strFacebook,
  strInstagram,
  strTwitter,
}) {
  strYoutube && teamTeamNetwork.appendChild(createLink(strYoutube, "youtube"));
  strFacebook &&
    teamTeamNetwork.appendChild(createLink(strFacebook, "Facebook"));
  strInstagram &&
    teamTeamNetwork.appendChild(createLink(strInstagram, "Instagram"));
  strTwitter && teamTeamNetwork.appendChild(createLink(strTwitter, "twitter"));
  if (
    strYoutube === "" &&
    strFacebook === "" &&
    strInstagram === "" &&
    strTwitter === ""
  ) {
    const p = document.createElement("p");
    p.innerText = "Esse time não possui redes sociais";
    teamTeamNetwork.appendChild(p);
  }
  function createLink(url, classe) {
    const link = document.createElement("a");
    link.setAttribute("href", `https://${url}`);
    link.setAttribute("class", classe);
    link.setAttribute("target", "_blank");
    link.innerHTML =
      classe === "youtube"
        ? `<img src="https://img.icons8.com/ios/50/000000/youtube-squared.png"/>`
        : classe === "Facebook"
        ? `<img src="https://img.icons8.com/ios/50/000000/facebook--v1.png"/>`
        : classe === "Instagram"
        ? `<img src="https://img.icons8.com/ios/50/000000/instagram-new--v1.png"/>`
        : `<img src="https://img.icons8.com/ios/50/000000/twitter-squared.png"/>`;
    return link;
  }
}
