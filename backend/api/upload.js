    // upload.js
    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const db = require('../db.js');

    // Setup Multer for file uploads
    const upload = multer({ dest: 'uploads/' });

    // API endpoint to add a new recipe
    router.post('/add-recipe', upload.single('recipe_image'), (req, res) => {
    const { recipe_title, recipe_description, servings, cook_time, ingredients, steps } = req.body; 
    const recipeImage = req.file; // Mengambil file dari req.file
        
    if (!recipe_title || !recipe_description || !servings || !cook_time || !recipeImage) {
        return res.status(400).json({ error: 'Judul, deskripsi, porsi, waktu persiapan, waktu memasak, dan gambar resep wajib diisi!' });
    }

    // Parsing ingredients dan steps jika berupa string (array)
    let ingredientsArray;
    let stepsArray;

    try {
        // Jika ingredients dan steps dikirim sebagai JSON string, parse menjadi array
        ingredientsArray = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
        stepsArray = typeof steps === 'string' ? JSON.parse(steps) : steps;
    } catch (e) {
        return res.status(400).json({ error: 'Format bahan atau langkah tidak valid.' });
    }

    // Konversi array ke string untuk penyimpanan di database (misalnya JSON)
    const ingredientsString = JSON.stringify(ingredientsArray);
    const stepsString = JSON.stringify(stepsArray);

    const imageUrl = `/uploads/${recipeImage.filename}`; // Menggunakan penyimpanan lokal untuk gambar

    // Insert recipe ke MySQL
    const query = `
        INSERT INTO recipes (title, description, servings, cook_time, ingredients, steps, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.execute(query, [recipe_title, recipe_description, servings, cook_time, ingredientsString, stepsString, imageUrl], (err, results) => {
        if (err) {
            console.error('Error inserting recipe:', err);
            return res.status(500).json({ error: 'Gagal menyimpan resep ke database.' });
        }
        res.status(201).json({ message: 'Recipe added successfully!', recipeId: results.insertId });
    });
});
    module.exports = router;
