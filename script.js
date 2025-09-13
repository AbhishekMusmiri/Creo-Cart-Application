//elements
let productsContainer = document.getElementById("scrollable-products");
let cartItems = document.getElementById("cart-items");

const products = [
    // {  id: 6, name: "Teachers",price: 3000, image: "teachers.jpg"},
    // {  id: 7, name: "Blenders",price: 1200, image: "bp.webp"},
    {  id: 1, name: "Laptop",price: 50000, image: "laptop.jpg"},
    {  id: 2, name: "Phone",price: 20000, image: "phone.jpg"},
    {  id: 3, name: "Tablet",price: 30000, image: "tablet.jpg"},
    {  id: 4, name: "Smart watch",price: 8000, image: "smartwatch.jpg"},
    {  id: 5, name: "Headphones",price: 3000, image: "headphones.jpg"},
]


products.forEach(function(item){
    // const DivElement = document.createElement("div");
    // DivElement.classname = "products_block";
    // DivElement.innerHTML = ` <img src=${product.image} class="product-image" alt="${product.name}S">
    //               <h3 class="product-name">${product.name}</h3>
    //     <p class="product-price">Rs.${product.price}</p>
    //           <button class="add-to-cart-btn" data-name="Laptop" data-price="800">Add to Cart</button>`
    // productsContainer.appendChild(DivElement);
    const productRow =`
    <div class="products_block">
        <img src="${item.image}" class="product-image" alt="${item.name}">
        <h3 class="product-name">${item.name}</h3>
        <p class="product-price">Rs.${item.price}</p>
        <button class="add-to-cart-btn" id="add-btn-${item.id}" onclick="addToCart(${item.id})">Add to Cart</button>
    </div>
    `;
    productsContainer.insertAdjacentHTML("beforeend",productRow);

    
});

const cart = [];

function addToCart(EnteredId){      
    
    const isProductAvailable = cart.some(function(item){
        return item.id === EnteredId;
    });
    var addBtn = document.getElementById('add-btn-' + EnteredId);
    if(isProductAvailable){
        return;
    }

    const productToAdd = products.find(function(item){
        return item.id === EnteredId;
    })
    cart.push(productToAdd);
    if(addBtn){
        addBtn.textContent = 'Added to Cart';
        addBtn.style.backgroundColor = '#22c55e';
        addBtn.style.color = '#fff';
        addBtn.disabled = true;
    }

    const cartItemRow = `<div class="cart_row" id="cart-row-${productToAdd.id}">
          <img src="${productToAdd.image}" class="cart-image" >
          <h3 class="cart-name">${productToAdd.name}</h3>
          <p class="cart-price">Rs.${productToAdd.price}</p>
          <button class="removeBtn" onclick="removeFromCart(${productToAdd.id})">Remove</button>
    </div>`;

    cartItems.insertAdjacentHTML("beforeend", cartItemRow);
    updateCartTotal();
}


function removeFromCart(productId){
    // Remove from cart array
    var index = cart.findIndex(function(item){ return item.id === productId; });
    if(index !== -1){
        cart.splice(index, 1);
    }
    // Remove cart row from DOM
    var cartRow = document.getElementById('cart-row-' + productId);
    if(cartRow){
        cartRow.parentNode.removeChild(cartRow);
    }
    // Restore Add to Cart button
    var addBtn = document.getElementById('add-btn-' + productId);
    if(addBtn){
        addBtn.textContent = 'Add to Cart';
        addBtn.style.backgroundColor = '';
        addBtn.style.color = '';
        addBtn.disabled = false;
    }
    updateCartTotal();
}

function updateCartTotal(){
    var total = cart.length;
    var totalDiv = document.getElementById('cart-total');
    if(totalDiv){
        totalDiv.textContent = 'Total Products: ' + total;
    }
    var priceTotal = cart.reduce(function(sum, item){ return sum + item.price; }, 0);
    var priceDiv = document.getElementById('cart-price-total');
    if(priceDiv){
        priceDiv.textContent = 'Total Price: Rs. ' + priceTotal;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var payBtn = document.getElementById('proceed-pay-btn');
    if(payBtn){
        payBtn.onclick = function(){
            if(cart.length === 0){
                alert('Your cart is empty!');
                return;
            }
            alert('Successfully order placed!');
            // Optionally clear cart after order
            cart.length = 0;
            document.getElementById('cart-items').innerHTML = '<h4>Cart is Empty !!</h4>';
            updateCartTotal();
            // Restore all Add to Cart buttons
            products.forEach(function(item){
                var addBtn = document.getElementById('add-btn-' + item.id);
                if(addBtn){
                    addBtn.textContent = 'Add to Cart';
                    addBtn.style.backgroundColor = '';
                    addBtn.style.color = '';
                    addBtn.disabled = false;
                }
            });
        };
    }
});



