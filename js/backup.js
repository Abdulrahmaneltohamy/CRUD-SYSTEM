var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCatogeryInput = document.getElementById("productCatogery");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");

var searchItemInput = document.getElementById("btnSearch");

var buttonAdd = document.getElementById("btnAdd");
var buttonUbdate = document.getElementById("btnUbdate");

var index = 0;



var productList = [];


if (localStorage.getItem("productListConatainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productListConatainer"));
  displayData();
}






function addProduct() {

  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    categories: productCatogeryInput.value,
    description: productDescriptionInput.value,
    image: `image/mealsimage/${productImageInput.files[0]?.name}`,
  };

  productList.push(product);

  localStorage.setItem("productListConatainer", JSON.stringify(productList));

  displayData();

  clearForm();

}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCatogeryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].categories}</td>
        <td>${productList[i].description}</td>
        <td>
          <img style="width: 50px;" src=" ${productList[i].image} " alt="product image">
        </td>
        <td>
          <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
          <button onclick="setFormUbdate(${i})" class="btn btn-outline-warning btn-sm">Ubdate</button>
        </td>
        </tr>`;
  }

  document.getElementById("tableData").innerHTML = cartona;
}


function deleteItem(indexItem) {
  productList.splice(indexItem, 1);

  localStorage.setItem("productListConatainer", JSON.stringify(productList));
  displayData();
}




function searchItem() {
  var term = searchItemInput.value;

  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      cartona += `
      <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].categories}</td>
      <td>${productList[i].description}</td>
      <td>
        <img style="width: 50px;" src=" ${productList[i].image} " alt="product image">
      </td>
      <td>
        <button onclick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
        <button onclick="setFormUbdate(${i})" class="btn btn-outline-warning btn-sm">Ubdate</button>
      </td>
      </tr>`;
    }
  }
  document.getElementById("tableData").innerHTML = cartona;

}



// var index = 0;


function setFormUbdate(indexUbdate) {
  buttonAdd.classList.add("d-none");
  buttonUbdate.classList.remove("d-none");

  productNameInput.value = productList[indexUbdate].name;
  productPriceInput.value = productList[indexUbdate].price;
  productCatogeryInput.value = productList[indexUbdate].categories;
  productDescriptionInput.value = productList[indexUbdate].description;

  index = indexUbdate;
}

function ubdateProducts() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    categories: productCatogeryInput.value,
    description: productDescriptionInput.value,
    image: `image/mealsimage/${productImageInput.files[0]?.name}`,
  };

  productList.splice(index, 1, product);
  displayData();
  localStorage.setItem("productListConatainer", JSON.stringify(productList));
  clearForm();

}














/*
localStorage.setItem("userName", "ahmed");
localStorage.setItem("userage", "52");
console.log(localStorage.getItem("userName"));
console.log(localStorage.length); */




// if (localStorage.getItem("productListConatainer") !== null) {
//   productList = JSON.parse(localStorage.getItem("productListConatainer"));
// displayData();
// }


// console.log("abdelrahman tohamy".includes("a"));

// var test = "IBRAHIM ali".toLowerCase().includes("A".toLowerCase())
// console.log(test);


// var test2 = "IPHone".toLowerCase().includes("I".toLowerCase())
// console.log(test2);









