import React, { useState, useEffect } from 'react';

const RecipeForm = ({ recipe = null, onSubmit, ingredients }) => {
    // Initialize state for form fields
    const [name, setName] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // If editing an existing recipe, populate form fields
    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setSelectedIngredients(recipe.ingredients.map(ingredient => ingredient.id));
        }
    }, [recipe]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the form data to send to parent
        const formData = {
            name,
            ingredients: selectedIngredients
        };

        onSubmit(formData);
    };

    const handleIngredientChange = (e) => {
        const { value, checked } = e.target;
        setSelectedIngredients(prevState =>
            checked
                ? [...prevState, value]  // Add ingredient
                : prevState.filter(id => id !== value)  // Remove ingredient
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Recipe Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Ingredients</label>
                <div>
                    {ingredients.map(ingredient => (
                        <div key={ingredient.id}>
                            <input
                                type="checkbox"
                                id={`ingredient-${ingredient.id}`}
                                value={ingredient.id}
                                checked={selectedIngredients.includes(ingredient.id)}
                                onChange={handleIngredientChange}
                            />
                            <label htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit">{recipe ? 'Update Recipe' : 'Create Recipe'}</button>
        </form>
    );
};

export default RecipeForm;
