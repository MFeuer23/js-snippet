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
	if (((pageHeight - scrollPosition) < (pageHeight * 0.1)) && triggerCount === 0 && $(".overlay").length === 0) {
	  triggerCount += 1;
	  alert("hey!");
  
    $("body").append(
      $("<div class='overlay'></div>"),
      $("<div class='modal'></div>").append(
        $("<div class='modal-content'></div>").text("You still have " + cartSize + " items in your cart!").append(
          $("<div class='cart-images'></div>"),
          $("<div class='cart-price'></div>").text("Checkout now for only " + cartValue),
          $("<button class='go-to-cart'></button>").text("GO TO CART"),
          $("<button class='close-modal'></button>").text("X")
        )
      )
    );
  
    for (let i = 0; i < cartSize; i++) {
      $(".cart-images").append(
        "<img src="+ cartImages[i] +">"
      )
    }
    //invoke styling function
    // return addStyling();
	} 
	
	//the overlay should trigger multiple times if dismissed (reset trigger count if user scrolls back up)
// 	if (((pageHeight - scrollPosition) > pageHeight * 0.1) && triggerCount !== 0){
// 	  triggerCount = 0
// 	}
});

//logo image: $(document).find(".logo-image")[0].src
//font header: font-family: ars_maquette_problack,sans-serif;
//font regular text: font-family: ars_maquette_proregular, sans-serif;

    