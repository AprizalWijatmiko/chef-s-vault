// Utility function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch recipe details from API
async function fetchRecipeDetail() {
    const recipeId = getQueryParam('id');
    if (!recipeId) {
        alert('Recipe not found.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) throw new Error('Recipe not found');
        const recipe = await response.json();

        // Populate the page with the recipe data
        document.getElementById('recipe-photo').src = recipe.image_url || 'default.jpg';
        document.getElementById('recipe-title').textContent = recipe.title;
        document.getElementById('recipe-story').textContent = recipe.story;
        document.getElementById('recipe-servings').textContent = recipe.servings;
        document.getElementById('recipe-time').textContent = recipe.time;

        // Populate the ingredients list
        const ingredientList = document.getElementById('ingredient-list');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = ingredient;
            ingredientList.appendChild(li);
        });

        // Populate the steps list
        const stepList = document.getElementById('step-list');
        recipe.steps.forEach(step => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = step;
            stepList.appendChild(li);
        });

        // Set up delete functionality
        document.getElementById('delete-recipe-btn').addEventListener('click', () => {
            deleteRecipe(recipeId);
        });

        // Set up share functionality
        document.getElementById('share-recipe-btn').addEventListener('click', () => {
            shareRecipe(recipeId);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch recipe details.');
        window.location.href = 'index.html';
    }
}

// Function to delete the recipe
async function deleteRecipe(recipeId) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        try {
            const response = await fetch(`/api/recipes/${recipeId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete recipe');
            alert('Recipe deleted successfully.');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting recipe.');
        }
    }
}

// Function to share the recipe
function shareRecipe() {
    const recipeUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Recipe from Chef\'s Vault',
            url: recipeUrl
        }).then(() => {
            console.log('Recipe shared successfully');
        }).catch(error => {
            console.error('Error sharing:', error);
        });
    } else {
        copyToClipboard(recipeUrl);
        alert('Recipe link copied to clipboard.');
    }
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

// Initialize when page loads
window.onload = fetchRecipeDetail;
