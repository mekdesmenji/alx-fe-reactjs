// import { useRecipeStore } from "../recipeStore";

// const RecipeList = () => {
//   const recipes = useRecipeStore((state) => state.recipes);

//   return (
//     <div>
//       {recipes.map((recipe) => (
//         <div key={recipe.id}>
//           <h3>{recipe.title}</h3>
//           <p>{recipe.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RecipeList;

import React from "react";
import useRecipeStore from "../store/recipeStore";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
