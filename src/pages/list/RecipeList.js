import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const RecipeList = ({ darkMode }) => {
  const [recipes, setRecipes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("barMetric_recipes")) || {};
    setRecipes(savedRecipes);
  }, []);

  const handleDelete = (recipeName) => {
    if (window.confirm("Bu tarifi silmek istediğinizden emin misiniz?")) {
      const savedRecipes = JSON.parse(localStorage.getItem("barMetric_recipes")) || {};
      delete savedRecipes[recipeName];
      localStorage.setItem("barMetric_recipes", JSON.stringify(savedRecipes));
      setRecipes(savedRecipes);
    }
  };

  const handleEdit = (recipeName) => {
    navigate(`/edit/${recipeName}`);
  };

  return (
    <div className={`container mx-auto p-4 ${darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}>
      <h1 className="text-3xl font-bold mb-4">Kaydedilen Reçeteler</h1>
      {Object.keys(recipes).length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.entries(recipes).map(([recipeName, recipeData]) => (
            <div key={recipeName} className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{recipeName}</h2>
                <ul className="mb-2">
                  {Object.entries(recipeData.products).map(([productId, product]) => (
                    <li key={productId} className="text-sm">
                      {productId.replace("_", " ")}: {product?.value || "N/A"} {product?.unit || ""}
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="text-sm">Toplam Gram: {recipeData.totals?.gram?.toFixed(2) || "N/A"}</p>
                  <p className="text-sm">Toplam ML: {recipeData.totals?.ml?.toFixed(2) || "N/A"}</p>
                  <p className="text-sm">Toplam CL: {recipeData.totals?.cl?.toFixed(2) || "N/A"}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4 space-x-2">
                <button onClick={() => handleEdit(recipeName)} className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-md">
                  Düzenle
                </button>
                <button onClick={() => handleDelete(recipeName)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz kaydedilen bir tarif yok.</p>
      )}
    </div>
  );
};

export default RecipeList;
