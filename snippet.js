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
  
    $("body").append(
      $("<div class='overlay'></div>"),
      $("<div class='modal'></div>").append(
        $("<div class='modal-content'></div>").append(
          $("<div class='modal-text'></div>").text("You still have " + cartSize + " items in your cart!"),
          
          $("<div class='cart-price'></div>").text("Checkout now for only " + cartValue),
          $("<div class='cart-images'></div>"),
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

function addStyling() {

    $(".overlay").css({
      "position": "fixed",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "background": "rgba(0,0,0,0.9",
      "z-index": "100"
    });

    $(".modal").css({
      "position": "fixed",
      "background": "#f7f7f7",
      "width": "40em",
      "max-width": "70%",
      "top": "50%",
      "left": "50%",

      "z-index": "101",
      "max-height": "70%",
      "transform": "translate(-50%, -50%)",
      "background-image": "url(https://ctl.s6img.com/society6/img/ZerOObfBLR6ctzx6xwN6vv9GdCs/w_700/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/b58ffb18b91a4d3ea2720dafb410defd/~~/faded-white-flowers-on-the-side-of-a-mountain-prints.jpg?wait=0&attempt=0)", 
      "background-repeat": "no-repeat center bottom",
      "background-position": "center"
    });
    
    $(".cart-images").css({
      "display": "block",
      "overflow-y": "auto",
      "max-height": "120px"
    });

    $(".modal-content").css({
      "align-items": "center",
      "justify-content": "center",
      "position": "relative",
      "padding": "8px",
      "text-align": "center"
    });
    
    $(".modal-text").css({
      "font-family": "ars_maquette_problack, sans-serif",
      "display": "inline-block",
      "flex-flow": "row wrap",
      "position": "relative",
      "padding": "20px 90px 10px",
      "font-size": "2em",
      "color": "#cc0001"
    });

    $(".cart-price").css({
      "font-family": "ars_maquette_proregular, sans-serif",
      "display": "inline-block",
      "font-size": "14px",
      "line-height": "1.25",
      "text-align": "center",
      "padding-bottom": "10px"
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
      "font-size": "16px",
      "text-transform": "uppercase",
      "text-align": "center",
      "padding": "15px 30px",
      "margin-top": "20px",
      "margin-bottom": "15px",
      "font-family": "ars_maquette_problack, sans-serif",
      "width": "50%"
    });

    $(".close-modal").css({
      "position": "absolute",
      "top": "10px",
      "right": "10px"
    });

    return closeModal();
}

function closeModal() {
  $(".close-modal").click(function() {
    $(".modal").remove();
    $(".overlay").remove();
  });
}