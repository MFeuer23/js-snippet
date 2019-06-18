# js-snippet-marmot

Go to [www.marmot.com](https://www.marmot.com/) and add at least 2 products to your cart. Then return to the home page.

Open the console of the browser, and run the code included in the `snippet.js` file.

Scroll to the bottom 10% of the page to view the overlay and modal.

## Bonus

Some potential problems that could arise if the snippet had more or less than the 2 items in the cart are:

* Storing and appending images must be done dynamically depending on the number of items in the cart. I addressed this by storing all of the `cartItems`, getting the `cartRows` (`cartItems.size`). Then I wrote for loops to iterate `cartRows` number of times when retrieving and storing `cartImages`, and when appending the images.
* Having more images might affect the styling of the modal. In my case, if I had more than 5 items in the cart, the modal overflowed past the background image. I addressed this by giving the `.cart-images` class the following CSS properties: `"height": "120px"` and `"overflow-y": "auto",`. This creates a vertical scroll bar if the images overflowed past the 120px set.
* Having only one item in the cart would affect the language in the modal text. In my case, I wrote `"You still have " + cartSize + " items in your cart!"`. So to address this, I dynamically changed "items" (plural) to "item" (singular) if there is only one item in the cart by creating an `itemPlural` variable and setting its value based on the `cartQty`. `cartQty === "1" ? itemPlural = "item" : itemPlural = "items";`
* If there are no items in the cart, the modal might still pop up with values of `undefined`. I addressed this by checking if `cartQty > 0` before appending the overlay.