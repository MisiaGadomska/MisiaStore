const setupSlideEffect = () => {
const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    });
});
} 


const getProducts = (tag) => {
    return fetch('/get-products', {
      method: "post",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
      return data;
    })
  }

  const createProductSlider = (data, parent, title) => {
    let slideContainer = document.querySelector(parent);

    slideContainer.innerHTML += `
    <section class="product">
            <h2 class="product-category">${title}</h2>
            <button class="pre-btn"><img src="../images/arrow.png" alt=""><button>
            <button class="nxt-btn"><img src="../images/arrow.png" alt=""></button>
            ${createProductCards(data)}
            </section>
            `
            setupSlideEffect();
  } 

  const createProductCards = (data) => {

    let start = '<div class="product-container">';
    let middle = ''; // this will contain card HTML
    let end = '</div>';
    for(let i = 0; i < data.length; i++){
      middle += `
      <div class="product-card">
                    <div class="product-image">
                        <span class="discount-tag">${data[i].discount}% off</span>
                    <img src="${data[i].images[0]}" class="product-thumb" alt="">
                    </div>
                    <div class="product-info">
                        <h2 class="product-brand">${data[i].name}</h2>
                        <p class="product-short-des">${data[i].shortDes} </p>
                        <span class="price">${data[i].sellPrice}</span><span class="actual-price">${data[i].actualPrice}</span>
                    </div>
                </div>`
    }
    return start + middle + end;

  }

  const express = require('express');
  const bodyParser = require('body-parser');
  const nodemailer = require('nodemailer');
  
  const app = express();
  app.use(bodyParser.json());
  
  app.post('/subscribe-newsletter', (req, res) => {
    const email = req.body.email;
    
    // Tutaj możesz dodać kod do zapisywania emaila w bazie danych
    
    // Wyślij email z kodem rabatowym
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
      }
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Twój kod rabatowy',
      text: 'Dziękujemy za zapisanie się na nasz newsletter! Oto Twój kod rabatowy: RABAT2024'
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Subscribed successfully');
      }
    });
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  