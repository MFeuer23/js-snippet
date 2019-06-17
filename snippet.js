let cartItems;
let cartSize;
let cartValue;
let cartImages = [];

//fetch values from shopping cart

fetch('https://www.marmot.com/cart')
  .then(function(response) {
    return response.text();
  }).then(function(data) {

    cartItems = $(data).find(".cart-row")
    cartSize = cartItems.length
    cartValue = $(data).find(".order-value")[0].innerHTML;

    for (let i = 0; i < cartSize; i++) { 
      cartImages.push(cartItems[i].children[0].children[0].children[0].src)
    }

  });

    