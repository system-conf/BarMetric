import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./RecipeList.css";

const RecipeList = ({ darkMode }) => {
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const recipesRef = ref(db, 'recipes/');
    onValue(recipesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRecipes(data);
      } else {
        setRecipes({});
      }
    });
  }, []);

  return (
    <div className={` ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="header">Kaydedilen Tarifler</h1>
      {Object.keys(recipes).length > 0 ? (
        <div className="recipe-list">
          {Object.entries(recipes).map(([recipeName, recipeData]) => (
            <div key={recipeName} className="recipe-card">
              <h2 className="recipe-title">{recipeName}</h2>
              <ul className="product-list">
                {Object.entries(recipeData.products).map(([productId, product]) => (
                  <li key={productId}>
                    {productId.replace("_", " ")}: {product.value} {product.unit}
                  </li>
                ))}
              </ul>
              <div className="totals">
                <p>Toplam Gram: {recipeData.totals.gram.toFixed(2)}</p>
                <p>Toplam ML: {recipeData.totals.ml.toFixed(2)}</p>
                <p>Toplam CL: {recipeData.totals.cl.toFixed(2)}</p>
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
