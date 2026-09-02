document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const searchInput = document.getElementById("search-input");
    const paginationContainer = document.getElementById("pagination-container");
    const cartCountBadge = document.getElementById("cart-count");

    let cartCount = 0;
    let currentPage = 1;


    function renderStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="bi bi-star-fill text-gold me-1"></i>';
            } else {
                starsHTML += '<i class="bi bi-star text-muted me-1"></i>';
            }
        }
        return starsHTML;
    }


    function displayProducts(productsToRender) {
        productsContainer.innerHTML = "";

        if (productsToRender.length === 0) {
            productsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted mb-0">No se encontraron productos.</p>
                </div>
            `;
            return;
        }


        productsToRender.forEach(product => {
            const col = document.createElement("div");
            col.className = "col";

            col.innerHTML = `
        <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden p-3">
            <!-- 
              d-flex flex-row d-md-flex flex-md-column: 
              En móvil (por defecto) es fila (horizontal). 
              En pantallas medianas (md) cambia a columna (vertical).
            -->
            <div class="d-flex flex-row d-md-flex flex-md-column align-items-center align-items-md-stretch h-100">
                
                <!-- Imagen -->
                <div class="p-2 bg-light rounded text-center me-3 me-md-0 mb-md-3" style="width: 100px; min-width: 100px; md-width: 100%;">
                    <img src="${product.image}" class="img-fluid rounded" alt="${product.title}" style="height: 120px; object-fit: contain;">
                </div>

                <!-- Contenido -->
                <div class="card-body p-0 d-flex flex-column justify-content-between w-100">
                    <div>
                        <h6 class="card-title fw-semibold text-dark mb-1" style="font-size: 1rem;">${product.title}</h6>
                        <p class="card-text fw-bold text-dark mb-2">$${product.price.toFixed(2)}</p>
                        <div class="mb-3" style="font-size: 0.85rem;">
                            ${renderStars(product.rating)}
                        </div>
                    </div>
                    <button class="btn btn-outline-dark btn-sm w-100 add-to-cart mt-2" data-id="${product.id}">
                        Comprar
                    </button>
                </div>

            </div>
        </div>
    `;
            productsContainer.appendChild(col);
        });

        attachCartEvents();


        attachCartEvents();
    }

    function renderPagination() {
        paginationContainer.innerHTML = `
            <li class="page-item ${currentPage === 1 ? 'active' : ''}"><a class="page-link" href="#" data-page="1">1</a></li>
            <li class="page-item ${currentPage === 2 ? 'active' : ''}"><a class="page-link" href="#" data-page="2">2</a></li>
            <li class="page-item ${currentPage === 3 ? 'active' : ''}"><a class="page-link" href="#" data-page="3">3</a></li>
        `;

        document.querySelectorAll(".page-link").forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                currentPage = parseInt(e.target.getAttribute("data-page"));
                renderPagination();
            });
        });
    }


    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filtered = PRODUCTS_DATA.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
    });

o
    function attachCartEvents() {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                cartCount++;
                cartCountBadge.textContent = cartCount;

            
                cartCountBadge.classList.add("animate_animated", "animate_bounce");
                setTimeout(() => {
                    cartCountBadge.classList.remove("animate_animated", "animate_bounce");
                }, 500);
            });
        });
    }


    displayProducts(PRODUCTS_DATA);
    renderPagination();
});