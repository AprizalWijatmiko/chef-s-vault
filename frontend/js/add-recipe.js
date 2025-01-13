// add-recipe.js

// Handle image preview
document.getElementById('file-input').addEventListener('change', function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var img = document.getElementById('preview');
        img.src = reader.result;
        img.style.display = 'block';  // Tampilkan gambar setelah upload
        document.getElementById('placeholder-text').style.display = 'none'; // Sembunyikan placeholder teks
    };
    reader.readAsDataURL(event.target.files[0]);
});


// Add new ingredient
const ingredientList = document.getElementById('ingredient-list');
const addIngredientBtn = document.getElementById('add-ingredient-btn');
const removeIngredientBtn = document.getElementById('remove-ingredient-btn');  

// Add new step
const stepList = document.getElementById('step-list');
const addStepBtn = document.getElementById('add-step-btn');
const removeStepBtn = document.getElementById('remove-step-btn');

// Function to update visibility of the remove buttons
function updateButtonVisibility() {
    // Update for ingredients
    const ingredientCount = ingredientList.querySelectorAll('.form-group').length;
    if (ingredientCount > 1) {
        removeIngredientBtn.style.display = 'inline-block';  // Show remove button
    } else {
        removeIngredientBtn.style.display = 'none';  // Hide remove button
    }

    // Update for steps
    const stepCount = stepList.querySelectorAll('.form-group').length;
    if (stepCount > 1) {
        removeStepBtn.style.display = 'inline-block';  // Show remove button
    } else {
        removeStepBtn.style.display = 'none';  // Hide remove button
    }
}

// Add new ingredient
addIngredientBtn.addEventListener('click', function () {
    const newIngredient = document.createElement('div');
    newIngredient.classList.add('form-group');
    newIngredient.innerHTML = '<input type="text" class="form-control ingredient-input" name="ingredients[]" placeholder="e.g., 2 tomatoes">';
    ingredientList.appendChild(newIngredient);
    updateButtonVisibility();  // Update button visibility after adding an ingredient
});

// Remove last ingredient
removeIngredientBtn.addEventListener('click', function () {
    const ingredients = ingredientList.querySelectorAll('.form-group');
    if (ingredients.length > 1) {  // Prevent removing if there's only one ingredient
        ingredientList.removeChild(ingredients[ingredients.length - 1]);
        updateButtonVisibility();  // Update button visibility after removing an ingredient
    }
});

// Add new step
addStepBtn.addEventListener('click', function () {
    const newStep = document.createElement('div');
    newStep.classList.add('form-group');
    newStep.innerHTML = '<textarea class="form-control step-input" name="steps[]" placeholder="Describe the next step"></textarea>';
    stepList.appendChild(newStep);
    updateButtonVisibility();  // Update button visibility after adding a step
});

// Remove last step
removeStepBtn.addEventListener('click', function () {
    const steps = stepList.querySelectorAll('.form-group');
    if (steps.length > 1) {  // Prevent removing if there's only one step
        stepList.removeChild(steps[steps.length - 1]);
        updateButtonVisibility();  // Update button visibility after removing a step
    }
});

// Initial call to set button visibility when the page loads
updateButtonVisibility();

// Handle "Simpan dan Tutup" Button
const saveAndCloseBtn = document.getElementById('save-and-close-btn');

saveAndCloseBtn.addEventListener('click', function() {
    const form = document.getElementById('recipe-form');
    const formData = new FormData(form);

    // Validasi sederhana untuk memastikan judul ada
    const title = formData.get('recipe_title');
    if (!title) {
        alert('Judul wajib diisi!');
        return;
    }

    // Optional: Validasi tambahan dapat ditambahkan di sini

    // Kirim data ke server menggunakan fetch
    fetch('/api/add-recipe', {  // Pastikan endpoint ini sesuai dengan routing di backend Anda
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Gagal menyimpan resep.');
            });
        }
        return response.json();
    })
    .then(data => {
        alert('Resep berhasil disimpan!');
        // Redirect ke halaman resep dengan ID yang baru saja disimpan
        window.location.href = `recipe.html?id=${data.recipeId}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Terjadi kesalahan: ${error.message}`);
    });
});

// Handle "Keluar" Button
const exitBtn = document.getElementById('exit-btn');

exitBtn.addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin keluar? Perubahan yang belum disimpan akan hilang.')) {
        window.location.href = 'index.html';  // Redirect ke halaman utama atau halaman lain
    }
});
