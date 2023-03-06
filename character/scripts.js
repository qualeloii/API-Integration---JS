dataObj = []
pageDestinantion = 0;

function nextPage(){
    pageDestinantion += 20;
    if (pageDestinantion < 1559){
        document.getElementById("cardPanel").innerHTML = "";
        getHeroes();
    }
}

function previousPage(){
    pageDestinantion -= 20;
    if (pageDestinantion >= 0){
        document.getElementById("cardPanel").innerHTML = "";
        getHeroes();
    }
}

function reset(){
    pageDestinantion = 0;
}

async function getHeroes() {
    const ts = '1646266073';
    const pk = 'fc931fd3f9cc72bc322808238637a23a';
    const hash = 'd84e3474870d3aadb04231d00b8d8c39';

    await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${pk}&hash=${hash}&offset=${pageDestinantion}`)
        .then(response => response.json())
        .then(jsonBody => {dataObj = jsonBody.data.results;}
        )
    for (let data of dataObj){
        if (!data.thumbnail.path.includes('image_not_available')){
            createCard(data);
        }     
    }
    console.log(dataObj);
    
}

function createCard(characterData){
    const cardPanel = document.getElementById("cardPanel");

    let imgSrc = characterData.thumbnail.path + '/portrait_fantastic.' + characterData.thumbnail.extension

    let card = document.createElement('div');
    card.className = "card shrink";
    let img = document.createElement('img');
    img.src = imgSrc;
    img.className = "card-img-top transition";
    let body = document.createElement('div');
    body.className = "overlay"
    let tittle = document.createElement('h5');
    tittle.className = "text";
    tittle.innerText = characterData.name;
    let description = document.createElement('p');
    description.className = "card-text";
    description.innerText = characterData.description;

    //console.log(characterData.name);
    //console.log(characterData.description);
    
    body.appendChild(tittle);
    card.append(img,body);
    cardPanel.appendChild(card);
}

function main(){
    getHeroes();
}

main();

window.onload = (event) => {
    console.log("page is fully loaded");
  };