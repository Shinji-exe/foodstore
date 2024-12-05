const categoriesId = document.getElementById("categoriesId")
const typeId = document.getElementById("typeId")
const productCards = document.getElementById("productCards")

async function gettAllCategories() {
    let promise = fetch("http://localhost:8081/api/categories")
    let response = await promise;
    let data = await response.json()
    populateFirstDropdown(data)
    console.log(data)
}

gettAllCategories()

async function getProducts(params) {
    let promise = fetch("http://localhost:8081/api/products")
    let response = await promise;
    let data = await response.json()
    // populateFirstDropdown(data)
    populateSecondDropdown(data)
    console.log(data)
}

getProducts()

function populateFirstDropdown(categories){
    for(let i = 0; i < categories.length; i++){
        let newCategory = document.createElement("option")
        newCategory.value = categories[i].id;
        newCategory.innerText = categories[i].name
        // categoriesId.appendChild(newCategory)
    }
}

function populateSecondDropdown(products){
    for(let i = 0; i < products.length; i++){
        let newCategory = document.createElement("option")
        newCategory.value = products[i].id;
        newCategory.innerText = products[i].productName
        typeId.appendChild(newCategory)
    }
}

function createCards(products){
    products.forEach((product)=>{
let ca
    })
}