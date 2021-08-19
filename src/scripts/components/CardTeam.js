class CardTeam extends HTMLElement {
  constructor() {
    super();
    this.attributes.length === 0 ? null : this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());
    const card = this.createCard();
    const cardInfo = this.createCardInfo();
    const logo = this.createLogo();
    card.appendChild(logo);
    card.appendChild(cardInfo);
    shadow.appendChild(card);
  }
	
  createCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
  }

  createCardInfo() {
    const card = document.createElement("div");
    const titulo = this.createInfoTitle();
    const sport = this.createInfoSport();
    const league = this.createInfoLeague();
    card.classList.add("card-info");
    card.appendChild(titulo);
    card.appendChild(sport);
    card.appendChild(league);
    return card;
  }

  createLogo() {
    const urlImg = this.getAttribute("logo");
    const logo = document.createElement("img");
    logo.classList.add("card-logo");
    logo.setAttribute("src", urlImg);
    return logo;
  }

  createInfoTitle() {
    const value = this.getAttribute("team");
    const logo = document.createElement("span");
    logo.classList.add("card-title");
    logo.innerText = value;
    return logo;
  }
  createInfoSport() {
    const value = this.getAttribute("sport");
    const logo = document.createElement("span");
    logo.classList.add("card-sport");
    logo.innerText = value;
    return logo;
  }
  createInfoLeague() {
    const value = this.getAttribute("league");
    const logo = document.createElement("span");
    logo.classList.add("card-league");
    logo.innerText = value;
    return logo;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
			.card{
				height: 100px;
				display:flex;
				padding: 10px;
				margin: 5px;
				background: rgba(228,228,228, 0.36);
				outline: 1px solid #000;
				position: relative;
				vertical-align: middle;
				transition: 0.5s;
			}
			.card:hover {
				outline: 1px solid #fff;
				color: var(--secondary-color);
			}

			.card::before,
  		.card::after {
    		width: 100%;
				height:100%;
  			z-index: 3;
  			content:'';
  			position: absolute;
  			top:0;
  			left:0;
  			box-sizing: border-box;
  			-webkit-transform: scale(0);
  			transition: 0.5s;
  		}
		
			.card::before,
			.card::after {
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				transform-origin: center; 
			}
		
			.card::before {
				border-top: 2px solid #fff;
				border-bottom: 2px solid #fff;
				transform: scale3d(0,1,1); 
			}
		
			.card::after {
				border-left: 2px solid #fff;
				border-right: 2px solid #fff;
				transform: scale3d(1,0,1);
			}
		
			.card:hover::before,
			.card:hover::after {
				transform: scale3d(1,1,1);
				transition: transform 0.5s;
			}

			.card-info{
				padding-left: 10px;
			}
			.card-logo{
				width: 80px;
				padding-right:5px;
			}
			.card-title{
				font-weight: bold;
			}
			span{
				display:block;
			}
		`;
    return style;
  }
}

customElements.define("card-team", CardTeam);
