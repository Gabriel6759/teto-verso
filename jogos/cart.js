let cart = JSON.parse(localStorage.getItem('tetoStoreCart')) || [];

// Elementos do DOM
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCountLabel = document.getElementById('cart-count');
const cartTotalLabel = document.getElementById('cart-total');
const clearCartBtn = document.querySelector('.btn-clear-cart');

// Abrir/Fechar Carrinho
openCartBtn.addEventListener('click', () => {
    cartOverlay.style.display = 'flex';
    renderCart();
});

closeCartBtn.addEventListener('click', () => {
    cartOverlay.style.display = 'none';
});

// Fechar ao clicar fora da janela (na área escura do overlay)
cartOverlay.addEventListener('click', (event) => {
    if (event.target === cartOverlay) {
        cartOverlay.style.display = 'none';
    }
});

// Função para mostrar notificação customizada
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => { toast.remove(); }, 3000);
}

// Adicionar ao Carrinho
function addToCart(name, price, image) {
    const exists = cart.some(item => item.name === name);
    if (exists) {
        showToast(`${name} já está no carrinho!`);
        return;
    }

    cart.push({ name, price, image });

    // Adiciona a classe de animação e a remove após o término (500ms)
    openCartBtn.classList.add('shake-anim');
    setTimeout(() => {
        openCartBtn.classList.remove('shake-anim');
    }, 500);

    updateCart();
    showToast(`${name} adicionado ao carrinho!`);
}

// Remover do Carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    renderCart();
}

// Atualizar Dados (Local Storage e Contador)
function updateCart() {
    localStorage.setItem('tetoStoreCart', JSON.stringify(cart));
    cartCountLabel.innerText = cart.length;
}

// Renderizar itens na janela
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">Seu carrinho está vazio.</p>';
        if (clearCartBtn) clearCartBtn.style.display = 'none';
    } else {
        if (clearCartBtn) clearCartBtn.style.display = 'block';
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                    <div>
                        <strong>${item.name}</strong><br>
                        <span style="color: #ffd700">R$ ${item.price.toFixed(2)}</span>
                    </div>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    cartTotalLabel.innerText = total.toFixed(2).replace('.', ',');
    updateCart();
}

// Finalizar Compra
function checkout() {
    if (cart.length === 0) {
        showToast("Seu carrinho está vazio!");
        return;
    }
    showToast("Compra realizada com sucesso no TetoVerso!");
    cart = [];
    updateCart();
    renderCart();
}

// Inicializar contador ao carregar
updateCart();