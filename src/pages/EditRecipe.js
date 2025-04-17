import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';

const EditRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const history = useHistory();

    // Fetch recipe and ingredients data
    useEffect(() => {
        const fetchData = async () => {
            const recipeResponse = await fetch(`http://localhost:8000/recipes/${id}`);
            const recipeData = await recipeResponse.json();
            setRecipe(recipeData);

            const ingredientsResponse = await fetch('http://localhost:8000/ingredients');
            const ingredientsData = await ingredientsResponse.json();
            setIngredients(ingredientsData);
        };
        fetchData();
    }, [id]);

    const handleEditRecipe = async (formData) => {
        const response = await fetch(`/api/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            history.push('/'); // Redirect to home page or recipe list
        } else {
            // Handle error
        }
    };

    if (!recipe || ingredients.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Recipe</h1>
            <RecipeForm
                recipe={recipe}
                onSubmit={handleEditRecipe}
                ingredients={ingredients}
            />
        </div>
    );
};

export default EditRecipe;
