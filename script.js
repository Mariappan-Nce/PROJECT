const url = "https://makeup-api.herokuapp.com/api/v1/products.json";
const makeupcontainer = document.getElementById("makeup-container");
const searchInput = document.getElementById("search");
let makeup = [];

function handleSearch(target) {
  const search = target.value;
  const searchMatch = makeup.filter((element) => {
    const name = element.name;
    return name.includes(search);
  });
  renderCards(searchMatch);
}

async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    makeup = [...data];
    renderCards(makeup);
  }
}
fetchData();

function renderCards(data = []) {
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(createCard(data[i]));
  }
  makeupcontainer.innerHTML = "";
   makeupcontainer.append(...cards);
}

function createCard(data = {}) {
  let card = document.createElement("div");
  let brands = document.createElement("h2");
  let names = document.createElement("h3");
  let prices = document.createElement("p");
    
  card.setAttribute("class", "card");

  let img = document.createElement("img");
  img.setAttribute("class", "image");
  img.setAttribute("src", data.image_link);
   card.append(img);

//    let descripe = document.createElement("a");
//     descripe.setAttribute("class", "descripe");
//     descripe.setAttribute("href", data.description);
//     descripe.innerText = "Product Description";
//   card.append(descripe);
let descripe = document.createElement("a");
  descripe.setAttribute("class", "descripe");
  descripe.setAttribute("onclick", `window.location.href="${data.description}"`)
  descripe.setAttribute("href", data.description);
  descripe.innerText = "Product Description";
  card.append(descripe);

  const { brand = "", name = "",price="" } = data;
  brands.innerText = brand;
  names.innerText = name;
  prices.innerText = price;

  card.append(brands, names,prices);
 
   let link = document.createElement("button");
  link.setAttribute("class", "link");
  link.setAttribute("onclick", `window.location.href="${data.product_link}"`)
  link.setAttribute("href", data.product_link);
  link.innerText = "View Products";
  card.append(link);

  return card;
}