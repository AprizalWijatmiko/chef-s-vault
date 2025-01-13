// Ambil elemen input gambar dan preview gambar
const imageInput = document.getElementById('recipe-image');
const previewImage = document.getElementById('preview-image');

// Variabel untuk pagination
let currentPage = 1; // Halaman saat ini
const recipesPerPage = 9; // Jumlah resep per halaman
let totalRecipes = 0; // Total resep

// Fungsi untuk mengambil dan menampilkan daftar resep
function fetchRecipes() {
    fetch('/recipes') // Pastikan endpoint sudah sesuai
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching recipes');
        }
        return response.json();
    })
    .then(recipes => {
        totalRecipes = recipes.length; // Hitung total resep
        displayRecipes(recipes); // Tampilkan resep untuk halaman saat ini
        updatePagination(); // Update navigasi pagination
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        alert('Terjadi kesalahan saat mengambil daftar resep.');
    });
}
// Fungsi untuk menampilkan resep berdasarkan halaman saat ini
function displayRecipes(recipes) {
    const recipeContainer = document.getElementById('recipe-list'); // Perbaiki ID
    recipeContainer.innerHTML = ''; // Kosongkan kontainer sebelum diisi ulang

    // Hitung indeks awal dan akhir resep yang akan ditampilkan
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = Math.min(startIndex + recipesPerPage, recipes.length);

    // Tambahkan resep yang sesuai ke dalam kontainer
    for (let i = startIndex; i < endIndex; i++) {
        const recipe = recipes[i];
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('col-md-4', 'mb-4'); // Responsif Bootstrap col-md-4
        recipeElement.innerHTML = `
            <a href="recipe.html?id=${recipe.id}" class="card-link">
                <div class="card h-100 shadow-sm rounded-3">
                    <img src="${recipe.image_url}" class="card-img-top" alt="${recipe.title}" style="border-radius: 12px;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${recipe.title}</h5>
                        <p class="card-text">${recipe.description}</p>
                    </div>
                </div>
            </a>
    `;
        recipeContainer.appendChild(recipeElement);
    }
}

// Fungsi untuk memperbarui tombol pagination
function updatePagination() {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');

    // Update tombol disabled
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(totalRecipes / recipesPerPage);
    
    // Update informasi halaman
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(totalRecipes / recipesPerPage)}`;
}

// Event listener untuk tombol pagination
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchRecipes(); // Ambil resep untuk halaman baru
    }
});

let debounceTimer;
document.getElementById('next-btn').addEventListener('click', () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (currentPage < Math.ceil(totalRecipes / recipesPerPage)) {
            currentPage++;
            fetchRecipes();
        }
    }, 300);  // Tunggu 300ms sebelum mengambil resep
});


document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < Math.ceil(totalRecipes / recipesPerPage)) {
        currentPage++;
        fetchRecipes(); // Ambil resep untuk halaman baru
    }
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero-section');

    // Get the bottom of the hero section
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Show or hide the navbar based on scroll position
    if (heroBottom < 0) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
});

// Panggil fetchRecipes ketika halaman dimuat
window.onload = fetchRecipes;
