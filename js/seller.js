let loader = document.querySelector('.loader');
let user = JSON.parse(sessionStorage.user || null);

const becomeSellerElement = document.querySelector('.become-seller');
const productListingElement = document.querySelector('.product-listing');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');

window.onload = () => {
  if (sessionStorage.user) {
    if (compareToken(user.authToken, user.email)) {
        if(!user.seller){
            becomeSellerElement.classList.remove('hide');
        } else{
            loader.style.display = 'block';
            setupProducts();
        }
    } else {
        location.replace('/seller.html');
      }
  } else {
    location.replace('/seller.html');
  }
}

showApplyFormBtn.addEventListener('click', () =>{
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const legitInfo = document.querySelector('#legitInfo');

applyFormButton.addEventListener('click', () => {
    if(!businessName.value.length || !address.value.length || !about.value.length || !number.value.length){
            showAlert('fill all the inputs')
    } else if(!tac.checked || !legitInfo.checked){
        showAlert('you must agree to our terms and conditions');
    } else{
        //making server request
        loader.style.display = 'block';
        sendData('/seller', {
            name:businessName.value,
            address: address.value,
            about: about.value,
            number: number.value,
            tac: tac.checked,
            legit: legit.checked,
            email: JSON.parse(sessionStorage.user).email
        })
    }
})

const setupProducts = () => {
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({"Content-Type": "application/json" }),
        body: JSON.stringify({email: user.email})
    })
    .then(res =>  res.json())
    .then(data => {
        loader.style.display = null;
        productListingElement.classList.remove('hide');
        if(data == 'no products'){
            let emptySvg = document.querySelector('.no-product-image');
            emptySvg.classList.remove('hide');
        } else{
            data.forEach(product => createProduct(product));
                
        }
    });
}