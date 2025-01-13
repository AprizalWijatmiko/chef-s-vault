// display.js
const express = require('express');
const router = express.Router();
const db = require('../db.js');

// API to get all recipes
router.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    }); 
});

// Get recipe by ID
router.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const query = 'SELECT * FROM recipes WHERE id = ?';
    
    db.execute(query, [recipeId], (err, results) => {
        if (err) {
            console.error('Error fetching recipe:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({
            id: results[0].id,
            title: results[0].title,
            story: results[0].description,
            ingredients: JSON.parse(results[0].ingredients),
            steps: JSON.parse(results[0].steps),
            servings: results[0].servings,
            time: results[0].cook_time,
            image_url: results[0].image_url
        });
    });
});

// Delete recipe by ID
router.delete('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const query = 'DELETE FROM recipes WHERE id = ?';
    
    db.execute(query, [recipeId], (err, results) => {
        if (err) {
            console.error('Error deleting recipe:', err);
            return res.status(500).json({ error: 'Failed to delete recipe' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });
    });
});

module.exports = router;