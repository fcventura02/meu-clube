import api from "./api.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idPlayer = urlParams.get("id");

const divThumb = document.getElementById("container-player-thumb");
const divInfo = document.getElementById("container-player-info");
const divNetwork = document.getElementById("container-player-network");
const divDescription = document.getElementById("container-player-description");
const divPlayerKit = document.getElementById("container-player-kit");
const divPlayerGalery = document.getElementById("container-player-galery");

idPlayer === null
  ? notIdSerach(
      ` 
    <p><strong>Você não selecionou um jogador!</strong>
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
    const players = await apiSearchTeam(idPlayer);
    const {
      strThumb,
      strCutout,
      strRender,
      strBanner,
      strFanart1,
      strFanart2,
      strFanart3,
      strFanart4,
    } = players;
    createElementThumb(players);
    createElementInfoPlayer(players);
    createElementWithSocialNetworks(players);
    createElementDescriptionPlayer(players);
    createElementIframe(players);
    createElementWithGallery(
      strThumb,
      strCutout,
      strRender,
      strBanner,
      strFanart1,
      strFanart2,
      strFanart3,
      strFanart4
    );
  } catch (error) {
    console.error(error);
    notIdSerach(`<h3>Não foi possivel acessar o jogador informado!</h3>`);
  }
}

function apiSearchTeam() {
  return api.get(`lookupplayer.php?id=${idPlayer}`).then((response) => {
    return response.data.players[0];
  });
}

function createElementThumb({ strThumb, strPlayer }) {
  divThumb.innerHTML = `<img src="${strThumb}" alt="thumbnail ${strPlayer}">`;
}

function createElementInfoPlayer({
  strPlayer,
  strBirthLocation,
  strHeight,
  strWeight,
  dateBorn,
  strNationality,
  strTeam,
  strPosition,
}) {
  const date = new Date(dateBorn);
  const h1 = document.createElement("h1");
  h1.innerText = strPlayer;
  const birthLocation = document.createElement("p");
  birthLocation.innerText = `Naturalidade: ${
    strBirthLocation ? strBirthLocation : "sem imformação"
  }`;
  const height = document.createElement("p");
  height.innerText = `Altura: ${strHeight ? strHeight : "sem imformação"}`;
  const weight = document.createElement("p");
  weight.innerText = `Peso: ${strWeight ? strWeight : "sem imformação"} kg`;
  const pdateBorn = document.createElement("p");
  pdateBorn.innerText = dateBorn
    ? `Aniversário: ${date.getDay()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`
    : "sem informação";
  const nationality = document.createElement("p");
  nationality.innerText = `Nacionalidade: ${
    strNationality ? strNationality : "sem imformação"
  }`;
  const team = document.createElement("p");
  team.innerText = `Time: ${strTeam ? strTeam : "sem imformação"}`;
  const position = document.createElement("p");
  position.innerText = `posição: ${
    strPosition ? strPosition : "sem imformação"
  }`;
  divInfo.appendChild(h1);
  divInfo.appendChild(nationality);
  divInfo.appendChild(birthLocation);
  divInfo.appendChild(height);
  divInfo.appendChild(weight);
  divInfo.appendChild(pdateBorn);
  divInfo.appendChild(team);
  divInfo.appendChild(position);
}

function createElementWithSocialNetworks({
  strFacebook,
  strInstagram,
  strTwitter,
}) {
  strFacebook && divNetwork.appendChild(createLink(strFacebook, "Facebook"));
  strInstagram && divNetwork.appendChild(createLink(strInstagram, "Instagram"));
  strTwitter && divNetwork.appendChild(createLink(strTwitter, "twitter"));
  if (strFacebook === "" && strInstagram === "" && strTwitter === "") {
    const p = document.createElement("p");
    p.innerText = "Esse time não possui redes sociais";
    divNetwork.appendChild(p);
  }
  function createLink(url, classe) {
    const link = document.createElement("a");
    link.setAttribute("href", `https://${url}`);
    link.setAttribute("class", classe);
    link.setAttribute("target", "_blank");
    link.innerHTML =
      classe === "Facebook"
        ? `<img src="https://img.icons8.com/ios/50/000000/facebook--v1.png"/>`
        : classe === "Instagram"
        ? `<img src="https://img.icons8.com/ios/50/000000/instagram-new--v1.png"/>`
        : `<img src="https://img.icons8.com/ios/50/000000/twitter-squared.png"/>`;
    return link;
  }
}

function createElementDescriptionPlayer({
  strDescriptionEN,
  strDescriptionPT,
}) {
  const p = document.createElement("p");
  p.innerText = strDescriptionPT ? strDescriptionPT : strDescriptionEN;
  divDescription.appendChild(p);
}

function createElementIframe({ strKit }) {
  const pesquisa = strKit ? strKit : "chuteira";
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    `https://www.zoom.com.br/search?q=${pesquisa}`
  );
  divPlayerKit.appendChild(iframe);
}

function createElementWithGallery(...props) {
  console.log(props);
  for (const iterator of props) {
    if (iterator) {
      const img = document.createElement("img");
      const div = document.createElement("div");
      div.setAttribute("class", "carousel-item");
      img.setAttribute("src", iterator);
      div.appendChild(img);
      divPlayerGalery.appendChild(div);
    }
  }
}
