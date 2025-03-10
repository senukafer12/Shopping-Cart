document.addEventListener('DOMContentLoaded', function() {
    let iconCart = document.querySelector('.iconCart');
    let closeCart = document.querySelector('.close');
    let body = document.querySelector('body');
    let listProductHTML = document.querySelector('.listProduct');

    let listCartHTML = document.querySelector('.listCart');

    let iconCartSpan = document.querySelector('.iconCart span');

    const listProducts = [
        {
            "id": 1,
            "name": "Reusable glass Water Bottle",
            "price": 5,
            "image":"cartimages/1.jpg"
        },
        {
            "id": 2,
            "name": "Reef Repair Coral-safe Sunscreen",
            "price": 8,
            "image":"cartimages/2.png"
        },
        {
            "id": 3,
            "name": "Book on life below water",
            "price": 6,
            "image":"cartimages/3.png"
        },
        {
            "id": 4,
            "name": "Sea-shell Lamp with Ornaments",
            "price": 10,
            "image":"cartimages/4.jpg"
        },
        {
            "id": 5,
            "name": "Whale Shark Long Sleeves",
            "price": 12,
            "image":"cartimages/5.webp"
        },
        {
            "id": 6,
            "name": "Whale Shark Short Sleeves",
            "price": 11,
            "image":"cartimages/6.webp"
        },
        {
            "id": 7,
            "name": "Lobster Cotton Hoodie",
            "price": 15,
            "image":"cartimages/7.webp"
        },
        {
            "id": 8,
            "name": "Whale Shark Swimming Shorts",
            "price": 6,
            "image":"cartimages/8.webp"
        },
        {
            "id": 9,
            "name": "Scuba diving Goggles",
            "price": 16,
            "image":"cartimages/9.jpg"
        },
        {
            "id": 10,
            "name": "Scuba diving Tanks ",
            "price": 140,
            "image":"cartimages/10.jpg"
        },
        {
            "id": 11,
            "name": "Scuba diving Wing-Fins",
            "price": 35,
            "image":"cartimages/11.jpg"
        },
        {
            "id": 12,
            "name": "Scuba diving Wet Suit",
            "price": 64,
            "image":"cartimages/12.png"
        }
    ];

    let carts = [];

    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    const addDataToHTML = () => {
        listProductHTML.innerHTML = '';
        if(listProducts.length > 0){
            listProducts.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id = product.id;
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price}</div>
                    <button class="addCart">Add to Cart</button>
                `;
                listProductHTML.appendChild(newProduct);
            });
        }
    };

    const checkCart = () => {
        // Retrieve cart data from local storage
        const cartData = localStorage.getItem('cart');

        // Check if cart data exists
        if (cartData) {
            carts = JSON.parse(cartData); // Parse cart data from local storage
        } else {
            carts = [];
        }
    };

    checkCart();

    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }
    });

    const addToCart = (product_id) => {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
        if(carts.length <= 0){
            carts = [{
                product_id: product_id,
                quantity: 1
            }];
        } else if(positionThisProductInCart < 0){
            carts.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        }
        addCartToHTML();
        addCartToMemory();
    };

    const addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(carts));
    };

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        let finalTotalPrice = 0; // Initialize final total price
        let finalTotalItems = 0; // Initialize final total items
        if (carts.length > 0) {
            carts.forEach(cart => {
                totalQuantity += cart.quantity;
                finalTotalItems += cart.quantity; // Increment final total items by the quantity of each product
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.dataset.id = cart.product_id;
                let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
                let info = listProducts[positionProduct];
                let totalPrice = info.price * cart.quantity;
                finalTotalPrice += totalPrice; // Add each product's total price to the final total price
                
                newCart.innerHTML = `
                    <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">$${totalPrice}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(newCart);
            });
        }
        localStorage.setItem('finalTotalPrice', finalTotalPrice)
        localStorage.setItem('finalTotalItems', finalTotalItems); // Store final total items in localStorage
        
        iconCartSpan.innerText = totalQuantity;
        // Display final total price wherever needed
        console.log("Final Total Price: $" + finalTotalPrice);
        console.log("Final Total Items: " + finalTotalItems); // Log final total items to console
    };

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = 'minus';
            if(positionClick.classList.contains('plus')){
                type = 'plus';
            }
            changeQuantity(product_id, type);
        }
    });

    const changeQuantity = (product_id, type) => {
        let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            switch (type) {
                case 'plus':
                    carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                    break;
                default:
                    let valueChange = carts[positionItemInCart].quantity - 1;
                    if(valueChange > 0){
                        carts[positionItemInCart].quantity = valueChange;
                    } else {
                        carts.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToMemory();
        addCartToHTML();
    };

    const initApp = () => {
        addDataToHTML();

        //get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    };

    // Call initApp function to initialize the application
    initApp();
});

document.addEventListener("DOMContentLoaded", function() {
    const popupButton = document.getElementById('popupButton');
    const popupBanner = document.getElementById('popupBanner');
    const closeButton = document.getElementById('closeButton');
  
    popupButton.addEventListener('click', function() {
      popupBanner.style.display = 'block';
      // Display success message using Swal.fire()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Check Out Successfully !",
        showConfirmButton: false,
        timer: 1500
      });
    });
  
    closeButton.addEventListener('click', function() {
      popupBanner.style.display = 'none';
    });
  });