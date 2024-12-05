const categoriesId = document.getElementById("categorySelect"); //First Dropdown
const typeId = document.getElementById("shopByTypeSelect"); //
const productCards = document.getElementById("productsList");

async function getAllCategories() {
  let promise = fetch("http://localhost:8081/api/categories");
  let response = await promise;
  let data = await response.json();
  populateFirstDropdown(data);
  console.log(data);
}

getAllCategories();

async function getProducts() {
  let promise = fetch("http://localhost:8081/api/products");
  let response = await promise;
  let data = await response.json();
  //    populateSecondDropdown(data);
  console.log(data);
  createCards(data);
}

getProducts();

function populateFirstDropdown(categories) {
  for (let i = 0; i < categories.length; i++) {
    let newCategory = document.createElement("option");
    newCategory.value = categories[i].categoryId;
    newCategory.innerText = categories[i].name;
    categoriesId.appendChild(newCategory);
  }
}

// function populateSecondDropdown(products) {
//   for (let i = 0; i < products.length; i++) {
//     let newCategory = document.createElement("option");
//     newCategory.value = products[i].id;
//     newCategory.innerText = products[i].productName;
//     typeId.appendChild(newCategory);
//   }
// }

function createCards(products) {
  //Using a forEach() method to make a card for each object in the array of 77 objects. Basically following the card design from bootstrap.
  products.forEach((product) => {
    const cardContainers = document.createElement("div");
    cardContainers.className = "card bodyOfCard";
    cardContainers.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.productName;

    const cardLine = document.createElement("hr");

    const cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    cardSubtitle.innerText = `$${product.unitPrice.toFixed(2)}`;

    const cardText = document.createElement("p");
    cardText.className = "card-text";

    if (product.unitsInStock === 0) {
      // const cardText = document.createElement("p");
      // cardText.className = "card-text";
      cardText.textContent = "Out of Stock!" ;
    } else {
      // const cardText = document.createElement("p");
      // cardText.className = "card-text";
      cardText.textContent = `Avaliable units: ${product.unitsInStock}`;
    }

    const cardText2 = document.createElement("p");
    cardText2.className = "card-text";
    cardText2.textContent = `Supplier: ${product.supplier}`;

    const cardLink = document.createElement("a");
    cardLink.href = `productDetail.html?productId=${product.productId}`;
    cardLink.innerText = "See More";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardLine);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardText2);
    cardBody.appendChild(cardLink);
    cardContainers.appendChild(cardBody);

    productCards.appendChild(cardContainers);
  });
}

async function selectCategory() {
  let idValue = categoriesId.value;
  productCards.innerHTML = "";
  if (idValue) {
    try {
        // productCards.textContent = "Loading..."
      let promise = fetch("http://localhost:8081/api/products");
      let response = await promise;
      let data = await response.json();
      console.log(data);
      let filteringItems = data.filter((items) => items.categoryId === idValue);
      createCards(filteringItems);
    } catch (error) {
      console.error("Error Code", error);
    }
  } else {
    productCards.innerHTML = "";
    getProducts();
  }
}

// async function selectCategory() {
//     let idValue = categoriesId.value;
//     productCards.innerHTML = ""; // Clear the display initially
    
//     if (idValue) {
//       try {
//         // Display a loading message
//         productCards.innerHTML = "<p>Loading products...</p>";
        
//         // Fetch filtered products from the server
//         let response = await fetch(`http://localhost:8081/api/products`);
//         let data = await response.json();
        
//         console.log(data); // Debugging
  
//         // Filter products based on selected category ID
//         let filteringItems = data.filter((items) => items.categoryId === idValue);
        
//         // Clear the loading message
//         productCards.innerHTML = "";
  
//         // Handle empty results
//         if (filteringItems.length === 0) {
//           productCards.innerHTML = "<p>No products found for this category.</p>";
//         } else {
//           createCards(filteringItems); // Display filtered products
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         productCards.innerHTML = "<p>Failed to load products. Please try again later.</p>";
//       }
//     } else {
//       // Reload all products if no category is selected
//       productCards.innerHTML = "<p>Loading all products...</p>";
//       try {
//         await getProducts();
//       } catch (error) {
//         console.error("Error reloading products:", error);
//         productCards.innerHTML = "<p>Failed to reload products. Please try again later.</p>";
//       }
//     }
//   }
  