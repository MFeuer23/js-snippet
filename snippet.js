
let cartInfo;
let cartItems;
let cartValue;

//fetch values from shopping cart

fetch('https://www.marmot.com/cart')
  .then(function(response) {
    console.log(response);
    return response.text();
  }).then(function(data) {

 
    console.log(JSON.stringify(data));
    cartInfo = JSON.stringify(data);
    
    let retrieveItems = function($cart){
      return $cart.find(".cart-row");
    };
    
    let retrieveTotal = function($cart){
      return $cart.find(".order-value");
    }
    cartItems = retrieveItems($(data));
    cartValue = retrieveTotal($(data))[0].innerHTML;

  });