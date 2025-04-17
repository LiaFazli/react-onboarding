import React from "react";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>All Recipes</h1>
            <Link to="/create">
                <button>Create Recipe</button>
            </Link>
            <RecipeList />
        </div>
    );
};

export default Home;
