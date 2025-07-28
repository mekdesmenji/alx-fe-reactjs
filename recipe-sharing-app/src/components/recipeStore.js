// import { create } from "zustand";

// export const useRecipeStore = create((set) => ({
//   recipes: [],
//   favorites: [],
//   recommendations: [],

//   addRecipe: (recipe) =>
//     set((state) => ({
//       recipes: [...state.recipes, recipe],
//     })),

//   addFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: [...state.favorites, recipeId],
//     })),

//   removeFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: state.favorites.filter((id) => id !== recipeId),
//     })),

//   generateRecommendations: () =>
//     set((state) => {
//       const recommended = state.recipes.filter(
//         (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
//       );
//       return { recommendations: recommended };
//     }),
// }));

import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  setRecipes: (recipes) => set({ recipes }),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));
