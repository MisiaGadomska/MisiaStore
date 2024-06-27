let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

//checking user is logged in or not
window.onload = () => {
    if(user){
        if(!compareToken(user.authToken, user.email)){
            location.replace('/addProduct.html');
        }
    } else{
        location.replace('/addProduct.html');
    }
}

//price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if (discountPercentage.value > 100) {
      discountPercentage.value = 90;
    } else {
      let discount = actualPrice.value * discountPercentage.value / 100;
      sellingPrice.value = actualPrice.value - discount;
    }
  })

  sellingPrice.addEventListener('input', () => {
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
  })

  //upload image handle
  let uploadImages = document.querySelectorAll('.fileupload');
  let imagePaths = []; // will store all uploaded images paths;
  let productImage = document.querySelectorAll('.product-iamge');
  productImage.style.backgroundImage = `url(${imageUrl})`;

  // form submission
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');
let sizes = []; // will store all the sizes

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

//store size function
const storeSizes = () => {
  sizes =[];
  let sizeCheckbox = document.querySelectorAll('.size-checkbox');
  sizeCheckbox.forEach(item => {
    if(item.checked){
      sizes.push(item.value);
    }
  })
}

const validateForm = () => {
  if(!productName.value.length){
    return showAlert('enter product name');
  } else if (shortLine.value.length > 100 || shortLine.value.length < 10) {
    return showAlert('short description must be between 10 to 100 letters long');
} else if (!des.value.length) {
    return showAlert('enter detail description about the product');
} else if (!imagePaths.length) { // image link array
    return showAlert('upload at least one product image');
} else if (!sizes.length) { // size array
    return showAlert('select at least one size');
} else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length){
  return showAlert('ypu must add pricings');
} else if(stock.value < 20){
  return showAlert('you should have at least 20 items in stock');
} else if(!tags.value.length){
  return showAlert('enter few tags to help ranking your product in search');
} else if(!tac.checked){
  return showAlert('you must agree to our terms and conditions');
}
return true;
}

const productData = () => {
  let tagArr = tags.value.spli(',');
  tagArr.forEach((item, i) => tagArr[i] = tagArr[i].trim());
  return data = {
    name: productName.value,
    shortDes: shortLine.value,
    des: des.value,
    images: imagePaths,
    sizes: sizes,
    actualPrice: actualPrice.value,
    discount: discountPercentage.value,
    sellPrice: sellingPrice.value,
    stock: stock.value,
    tags: tags.value,
    tac: tac.checked,
    email: user.email
  }
}

addProductBtn.addEventListener('click', () =>{
  storeSizes();
  if(validateForm()){
    loader.style.display = 'block';
    let data = productData();
    sendData('/add-product', data);
  }
})