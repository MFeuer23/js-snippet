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
        $("<div class='modal-content'></div>").append(
          $("<div class='modal-text'></div>").text("You still have " + cartSize + " items in your cart!"),
          $("<div class='cart-images'></div>"),
          $("<div class='cart-price'></div>").text("Checkout now for only " + cartValue),
          $("<button class='go-to-cart' onclick=window.location='https://www.marmot.com/cart'></button>").text("GO TO CART"),
          $("<button class='close-modal'></button>").text("X")
        )
      )
    );
  
    for (let i = 0; i < cartSize; i++) {
      $(".cart-images").append(
        "<img src="+ cartImages[i] +">"
      )
    }

    return addStyling();
	} 
	
	//the overlay should trigger multiple times if dismissed (reset trigger count if user scrolls back up)
	if (((pageHeight - scrollPosition) > pageHeight * 0.1) && triggerCount !== 0){
	  triggerCount = 0
	}
});

//logo image: $(document).find(".logo-image")[0].src
//font header: font-family: ars_maquette_problack,sans-serif;
//font regular text: font-family: ars_maquette_proregular, sans-serif;

function addStyling() {

    $(".overlay").css({
      "position": "fixed",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "background": "rgba(0,0,0,0.9)",
      "z-index": "100"
    });

    $(".modal").css({
      "position": "fixed",
      "padding": "1em",
      "outline": "0",
      "background": "#fff",
      "width": "30em",
      "max-width": "100%",
      "top": "50%",
      "left": "50%",
      "overflow-y": "auto",
      "z-index": "101",
      "max-height": "calc(100% - 100px)",
      "transform": "translate(-50%, -50%)"
    });
    
    $(".cart-images").css({
      "display": "block"
    });

    $(".modal-content").css({
      "align-items": "center",
      "justify-content": "center",
      "flex-flow": "row wrap",
      "position": "relative",
      "padding": "35px",
    });
    
    $(".modal-text").css({
      "font-family": "ars_maquette_problack, sans-serif",
      "display": "flex",
      "flex-flow": "row wrap",
      "position": "relative",
      "padding": "35px"
    });

    $("modal-price").css({
      "display": "flex",
      "font-size": "24px",
      "line-height": "1.25",
      "text-align": "center"
    });

    $(".go-to-cart").hover(function() {
      $(this).css({
        "background": "#cc0001",
        "border": "1px solid #cc0001",
        "color": "#fff"
      }); 
    }, function(){
      $(this).css({
        "background": "#fff",
        "border": "1px solid #000",
        "color": "#000"
      }); 
    });
    
    $(".go-to-cart").css({
      "background": "#fff",
      "border": "1px solid #000",
      "font-size": "1rem",
      "text-transform": "uppercase",
      "text-align": "center",
      "padding": "15px 30px",
      "margin-top": "25px",
      "font-family": "ars_maquette_problack, sans-serif",
      "width": "50%"
    });

    $(".close-modal").css({
      "position": "absolute",
      "top": "0",
      "right": "0"
    });

    return closeModal();
}

function closeModal() {
  $(".close-modal").click(function() {
    $(".modal").remove();
    $(".overlay").remove();
  });
}