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
  
//trigger

let triggerCount = 0;
$(window).scroll(function() {
	let pageHeight = $(document).height();
	let scrollPosition = $(window).height() + $(window).scrollTop();
	if (((pageHeight - scrollPosition) < (pageHeight * 0.1)) && triggerCount === 0) {
	  triggerCount += 1
	    alert("hey!")
	}
});

    