import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = () => {
        fetch("http://localhost:8000/recipes/")
            .then((res) => res.json())
            .then((data) => setRecipes(data['recipes']))
            .catch((err) => console.error("Failed to fetch recipes", err));
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/recipes/${id}/`, {
            method: "DELETE",
        })
            .then(() => fetchRecipes())
            .catch((err) => console.error("Delete failed", err));
    };

    return (
        <div>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id} style={{ marginBottom: "10px" }}>
                        <strong>{recipe.name}</strong>

                        <div style={{ marginTop: "5px" }}>
                            <Link to={`/edit/${recipe.id}`}>
                                <button style={{ marginRight: "10px" }}>Edit</button>
                            </Link>

                            <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
