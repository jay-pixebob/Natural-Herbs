let favorites = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        addToCart(button);
    });
});

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        showModal(button);
    });
});

document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', () => {
        toggleFavorite(button);
    });
});

document.getElementById('cart-trigger').addEventListener('click', () => {
    showCart();
    updateCartItems();
});

document.getElementById('close-cart').addEventListener('click', () => {
    closeCart();
});

document.getElementById('place-order').addEventListener('click', () => {
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    window.location.href = 'payment.html'; // Redirect to the payment page
});

document.getElementById('close-modal').addEventListener('click', () => {
    closeModal();
});

function addToCart(button) {
    const productElement = button.closest('.product');
    const productName = productElement.querySelector('.product-front h3').textContent;
    const productPrice = parseFloat(productElement.querySelector('.product-front p').textContent.replace('Price: $', ''));

    cart.push({ name: productName, price: productPrice });
    cartCount++;
    totalAmount += productPrice;

    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    showCart();
    updateCartItems();
}

function toggleFavorite(button) {
    const productElement = button.closest('.product');
    const productName = productElement.querySelector('.product-front h3').textContent;

    if (favorites.includes(productName)) {
        favorites = favorites.filter(item => item !== productName);
        button.textContent = 'Add to Favorites';
        button.classList.remove('favorited');
    } else {
        favorites.push(productName);
        button.textContent = 'Remove from Favorites';
        button.classList.add('favorited');
    }

    console.log("Favorites:", favorites); // For debugging
}

function showCart() {
    document.getElementById('cart').classList.add('open');
}

function closeCart() {
    document.getElementById('cart').classList.remove('open');
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = () => {
            cancelOrder(index);
        };

        itemElement.appendChild(cancelButton);
        cartItemsContainer.appendChild(itemElement);
    });
}

function cancelOrder(index) {
    const price = cart[index].price;
    cart.splice(index, 1);
    cartCount--;
    totalAmount -= price;
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
    updateCartItems();
}

function showModal(button) {
    const productElement = button.closest('.product');
    const productName = productElement.querySelector('.product-front h3').textContent;
    const productPrice = productElement.querySelector('.product-front p').textContent;
    const productDescription = productElement.querySelector('.product-back p').textContent;

    document.getElementById('modal-title').textContent = productName;
    document.getElementById('modal-price').textContent = productPrice;
    document.getElementById('modal-description').textContent = productDescription;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('.product-front h3').textContent.toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Category filtering functionality
document.querySelectorAll('.category').forEach(categoryLink => {
    categoryLink.addEventListener('click', (event) => {
        event.preventDefault();
        const selectedCategory = categoryLink.getAttribute('data-category');
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            if (selectedCategory === 'all' || product.getAttribute('data-category') === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});