import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

const RecipeList = ({ darkMode }) => {
  const [recipes, setRecipes] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [newValues, setNewValues] = useState({});

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

  const handleDelete = (recipeName) => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeName}`);
    remove(recipeRef);
  };

  const handleEdit = (recipeName, recipeData) => {
    setEditMode(true);
    setCurrentRecipe(recipeName);
    setNewValues(recipeData);
  };

  const handleSave = () => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${currentRecipe}`);
    update(recipeRef, newValues);
    setEditMode(false);
    setCurrentRecipe(null);
    setNewValues({});
  };

  const handleChange = (e, productId) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({
      ...prevValues,
      products: {
        ...prevValues.products,
        [productId]: {
          ...prevValues.products[productId],
          [name]: value,
        },
      },
    }));
  };

  return (
    <div className={`container mx-auto p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-4">Kaydedilen Tarifler</h1>
      {Object.keys(recipes).length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.entries(recipes).map(([recipeName, recipeData]) => (
            <div key={recipeName} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{recipeName}</h2>
              {editMode && currentRecipe === recipeName ? (
                <div>
                  <ul className="mb-2">
                    {Object.entries(recipeData.products).map(([productId, product]) => (
                      <li key={productId} className="text-sm">
                        <input
                          type="text"
                          name="value"
                          value={newValues.products[productId].value}
                          onChange={(e) => handleChange(e, productId)}
                          className="px-2 py-1 border border-gray-300 rounded-md mr-2"
                        />
                        {product.unit}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Kaydet
                  </button>
                </div>
              ) : (
                <div>
                  <ul className="mb-2">
                    {Object.entries(recipeData.products).map(([productId, product]) => (
                      <li key={productId} className="text-sm">
                        {productId.replace("_", " ")}: {product.value} {product.unit}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-sm">Toplam Gram: {recipeData.totals.gram.toFixed(2)}</p>
                    <p className="text-sm">Toplam ML: {recipeData.totals.ml.toFixed(2)}</p>
                    <p className="text-sm">Toplam CL: {recipeData.totals.cl.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(recipeName, recipeData)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(recipeName)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md mt-2 ml-2"
                  >
                    Sil
                  </button>
                </div>
              )}
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
