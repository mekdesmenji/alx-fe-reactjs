import create from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],

  setRecipes: (recipes) => set({ recipes }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });

    const filtered = get().recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );

    set({ filteredRecipes: filtered });
  },

  addRecipe: (newRecipe) => {
    const updatedRecipes = [...get().recipes, newRecipe];
    set({ recipes: updatedRecipes });

    const filtered = updatedRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },
}));

export default useRecipeStore;
