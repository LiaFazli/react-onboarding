import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm';

const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = () => {
        fetch("http://localhost:8000/ingredients/")
            .then((res) => res.json())
            .then((data) => setIngredients(data))
            .catch((err) => console.error("Failed to fetch ingredients", err));
    };

    // Fetch ingredients list from the server
    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleCreateRecipe = async (formData) => {
        const response = await fetch('http://localhost:8000/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Redirect or notify the user that the recipe was created
        } else {
            // Handle error
        }
    };

    return (
        <div>
            <h1>Create a New Recipe</h1>
            <RecipeForm
                onSubmit={handleCreateRecipe}
                ingredients={ingredients}
            />
        </div>
    );
};

export default CreateRecipe;
