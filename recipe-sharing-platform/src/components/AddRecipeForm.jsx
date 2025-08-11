import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2)
      newErrors.ingredients =
        "At least two ingredients required (comma separated)";
    if (!steps.trim()) newErrors.steps = "Preparation steps are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Recipe submitted! (Replace with real submit logic)");

      setTitle("");
      setIngredients("");
      setSteps("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="title">
          Recipe Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter recipe title"
        />
        {errors.title && (
          <p className="text-red-500 mt-1 text-sm">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="ingredients">
          Ingredients (comma separated)
        </label>
        <textarea
          id="ingredients"
          rows="3"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className={`w-full px-3 py-2 border rounded resize-y ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="E.g. 200g spaghetti, 2 eggs, cheese"
        ></textarea>
        {errors.ingredients && (
          <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold" htmlFor="steps">
          Preparation Steps
        </label>
        <textarea
          id="steps"
          rows="4"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className={`w-full px-3 py-2 border rounded resize-y ${
            errors.steps ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Describe the cooking steps"
        ></textarea>
        {errors.steps && (
          <p className="text-red-500 mt-1 text-sm">{errors.steps}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;
