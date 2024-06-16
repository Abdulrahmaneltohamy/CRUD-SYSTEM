// globar variable
var productName = document.getElementById("productName");
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var addBtn = document.getElementById("btnAdd");
var ubdateBtn = document.getElementById("btnUbdate");

var currentIndex;

var allProduct = [];

if (localStorage.getItem("productContainer") != null) {
  allProduct = JSON.parse(localStorage.getItem("productContainer"));
  displayProduct(allProduct);
}


// add product
addBtn.addEventListener("click", function () {
  addProduct();
})

function addProduct() {
  if (
    validateName() == true &&
    validateNumer() == true &&
    validateCatogery() == true &&
    validateDescription() == true
    // validateImage() == true
  ) {
    var productData = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: productImage.files[0]?.name ? `image/${productImage.files[0]?.name}`: `image/c.jpg`
    }
    allProduct.push(productData);
    setLocalStorage();
    displayProduct(allProduct);
    clearForm();
  }
}

// dispaly data
function displayProduct() {
  var cartona = "";
  for (var i = 0; i < allProduct.length; i++) {
    cartona += `
        <div class="col-md-4">
          <div class="item rounded-2 overflow-hidden">
            <img style="height: 300px;" src="${allProduct[i].image}" class="w-100" alt="product image">
            <div class="item-desc p-2">
              <h2 class="h6"><b>Title : </b>${allProduct[i].name} </h2>
              <h3 class="h6"><b>Price : </b>${allProduct[i].price}</h3>
              <h3 class="h6"><b>Category : </b>${allProduct[i].category}</h3>
              <p class="h6"><b>Description : </b>${allProduct[i].description}</p>
              <button onclick="getDataToUbdate(${i})" class="btn btn-warning w-100 mb-2">Ubdate</button> 
              <button onclick="DeleteItem(${i})" class="btn btn-danger w-100">Delete</button>
              </div>
          </div>
        </div>
          `
  }
  document.getElementById("myData").innerHTML = cartona;
}

// clear the form from data and vaild alert
function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productCategory.value = null;
  productDescription.value = null;
  productImage.value = null;

  productName.classList.remove("is-valid")
  productPrice.classList.remove("is-valid")
  productCategory.classList.remove("is-valid")
  productDescription.classList.remove("is-valid")
  productImage.classList.remove("is-valid")
}

// delete item
function DeleteItem(index) {
  console.log(index);
  allProduct.splice(index, 1);
  displayProduct(allProduct);
  setLocalStorage();
}

// ubdate data
// 1-get new data
function getDataToUbdate(index) {
  currentIndex = index;
  productName.value = allProduct[index].name;
  productPrice.value = allProduct[index].price;
  productCategory.value = allProduct[index].category;
  productDescription.value = allProduct[index].description;

  addBtn.classList.add("d-none");
  ubdateBtn.classList.remove("d-none");
}
// 2-ubdate with the new data
ubdateBtn.addEventListener("click", function () {
  ubdateData();
})

function ubdateData() {
  allProduct[currentIndex].name = productName.value;
  allProduct[currentIndex].price = productPrice.value;
  allProduct[currentIndex].category = productCategory.value;
  allProduct[currentIndex].description = productDescription.value;
  setLocalStorage();
  displayProduct();
  clearForm();
  addBtn.classList.remove("d-none");
  ubdateBtn.classList.add("d-none");
}

function setLocalStorage() {
  localStorage.setItem("productContainer", JSON.stringify(allProduct));
}

// search item
var searchBtn = document.getElementById("btnSearch");

searchBtn.addEventListener("input", function () {
  searchItem();
})

function searchItem() {
  var term = searchBtn.value;
  var cartona = "";
  for (var i = 0; i < allProduct.length; i++) {
    if (allProduct[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      cartona += `
        <div class="col-md-4">
          <div class="item rounded-2 overflow-hidden">
            <img style="height: 300px;" src="${allProduct[i].image}" class="w-100" alt="product image">
            <div class="item-desc p-2">
              <h2 class="h6"><b>Title : </b>${allProduct[i].name} </h2>
              <h3 class="h6"><b>Price : </b>${allProduct[i].price}</h3>
              <h3 class="h6"><b>Category : </b>${allProduct[i].category}</h3>
              <p class="h6"><b>Description : </b>${allProduct[i].description}</p>
              <button onclick="getDataToUbdate(${i})" class="btn btn-warning w-100 mb-2">Ubdate</button> 
              <button onclick="DeleteItem(${i})" class="btn btn-danger w-100">Delete</button>
              </div>
          </div>
        </div>
          `;
    }
  }
  document.getElementById("myData").innerHTML = cartona;
}

// function searchItem(searchValue) {
//   var itemSearch = [];
//   for (var i = 0; i < allProduct.length; i++) {
//     if (allProduct[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
//       itemSearch.push(allProduct[i]);
//       displayProduct(itemSearch);
//     }
//   }
// }



// validation
// 1-validate name
productName.addEventListener("input", function () {
  validateName();
})

function validateName() {
  var regex = /^[A-Z][a-z]{3,8}$/
  var nameValue = productName.value;
  var alerNameInput = document.getElementById("alertName");

  if (regex.test(nameValue) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    alerNameInput.classList.add("d-none");
    return true;
  }
  else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    alerNameInput.classList.remove("d-none");
    return false;
  }
}

// 2-validate Numer
productPrice.addEventListener("input", function () {
  validateNumer();
})

function validateNumer() {
  var regex = /^[0-9]{2,5}$/;
  var text = productPrice.value;
  var numInvalidInput = document.getElementById("alertPrice")

  if (regex.test(text) == true) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid")
    numInvalidInput.classList.add("d-none");
    return true;
  }
  else {
    productPrice.classList.add("is-invalid")
    productPrice.classList.remove("is-valid");
    numInvalidInput.classList.remove("d-none");
    return false;
  }
}

// 3-validate category
productCategory.addEventListener("input", function () {
  validateCatogery();
})

function validateCatogery() {
  var regex = /^(cono|Mix|strawberry|chocolate)$/i;
  var text = productCategory.value;
  var catogeryInvalidInput = document.getElementById("alertCategory")

  if (regex.test(text) == true) {
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid")
    catogeryInvalidInput.classList.add("d-none");
    return true;
  }
  else {
    productCategory.classList.add("is-invalid")
    productCategory.classList.remove("is-valid");
    catogeryInvalidInput.classList.remove("d-none");
    return false;
  }
}

// 4-validate Description
productDescription.addEventListener("input", function () {
  validateDescription();
})

function validateDescription() {
  var regex = /^.{3,20}$/;
  var text = productDescription.value;
  var descriptionInvalidInput = document.getElementById("alertDescription")

  if (regex.test(text) == true) {
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid")
    descriptionInvalidInput.classList.add("d-none");
    return true;
  }
  else {
    productDescription.classList.add("is-invalid")
    productDescription.classList.remove("is-valid");
    descriptionInvalidInput.classList.remove("d-none");
    return false;
  }
}

// 5-validate Image
productImage.addEventListener("change", function () {
  validateImage();
})

function validateImage() {
  var regex = /^.{1,}\.(png|jpg|avif|jpeg|svg)$/;
  var text = productImage.value;
  var imageInvalidInput = document.getElementById("alertImage");

  if (regex.test(text) == true) {
    productImage.classList.add("is-valid");
    productImage.classList.remove("is-invalid");
    imageInvalidInput.classList.add("d-none");
    return true;
  }
  else {
    productImage.classList.add("is-invalid")
    productImage.classList.remove("is-valid");
    imageInvalidInput.classList.remove("d-none");
    return false;
  }
}