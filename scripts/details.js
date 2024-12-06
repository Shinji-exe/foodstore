"use strict";

const cardSection = document.getElementById("cardSection");
const relationItems = document.getElementById("relatedItems");
const productBody = document.getElementById("productBody");




const urlParams = new URLSearchParams(location.search);

let productId = urlParams.get("productId");

async function getAProduct() {
  let promise = fetch(`http://localhost:8081/api/products/` + productId);
  let response = await promise;
  let product = await response.json();
  console.log(product);
  createCardForProduct(product);
  relatedItems(product);
}

getAProduct();

let ingredientsArea = document.createElement("div");
ingredientsArea.className = "d-flex align-items-center";

function createCardForProduct(product) {
  //   for (let i = 0; i < product.length; i++) {

  const cardContainers = document.createElement("div");
  cardContainers.className = "card w-100 bodyOfCard";
  cardContainers.style.width = "18rem";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = product.productName;

  const cardLine = document.createElement("hr");

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
  cardSubtitle.innerText = `$ ${product.unitPrice}`;

  const cardSubtitle2 = document.createElement("h6");
  cardSubtitle2.className = "card-subtitle mb-2 text-body-secondary";
  cardSubtitle2.innerText = product?.tableInfo?.servingSize 
  ? `Serving Size: ${product.tableInfo.servingSize}` 
  : "Serving Size: Not available";

  const cardText = document.createElement("p");
  cardText.className = "card-text";

  if (product.unitsInStock === 0) {
    // const cardText = document.createElement("p");
    // cardText.className = "card-text";
    cardText.textContent = "Out of Stock!";
  } else {
    // const cardText = document.createElement("p");
    // cardText.className = "card-text";
    cardText.textContent = "Avaliable: " + product.unitsInStock;
  }

  const cardText2 = document.createElement("p");
  cardText2.className = "card-text";
  cardText2.textContent = product.supplier;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardLine);

  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardSubtitle2);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardText2);
  // cardBody.appendChild(cardLink);
  cardContainers.appendChild(cardBody);
  cardSection.appendChild(cardContainers);

  for (let i = 0; i < product.tableInfo.ingredients.length; i++) {
    // let ingredientsArea = document.createElement("div");
    // ingredientsArea.className = "d-flex align-items-center";

    let types = document.createElement("p");
     types.className = "pe-3";

    types.innerText = `${product.tableInfo.ingredients[i]}`;
    ingredientsArea.appendChild(types);
    cardBody.appendChild(ingredientsArea);
  }

  let tableRow = productBody.insertRow();

  let tableData = tableRow.insertCell();
  tableData.innerText = product.tableInfo.nutritionalFacts.calories;

  let tableData2 = tableRow.insertCell();
  tableData2.innerText = product.tableInfo.nutritionalFacts.protein;

  let tableData3 = tableRow.insertCell();
  tableData3.innerText = product.tableInfo.nutritionalFacts.carbohydrates;

  let tableData4 = tableRow.insertCell();
  tableData4.innerText = product.tableInfo.nutritionalFacts.fiber;

  let tableData6 = tableRow.insertCell();
  tableData6.innerText = product.tableInfo.nutritionalFacts.sugars;

  let tableData7 = tableRow.insertCell();
  tableData7.innerText = product.tableInfo.nutritionalFacts.fat;
  //   }
}

// async function relatedItems(currentProduct) {
//   let promise = fetch(`http://localhost:8081/api/products/`);
//   let response = await promise;
//   let data = await response.json();
//   console.log(data);
//   getRelations(data, currentProduct);
// }

// relatedItems();

// function getRelations(data, currentProduct) {
//   let relations = data.filter((product) => product.supplier === currentProduct.supplier && product.id !== currentProduct.id);
//   relations.forEach((relation) => {
//     createCardForProduct(relation, relationItems);
//   });
// }
