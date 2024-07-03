import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";

const RecipeList = ({ darkMode }) => {
  const [recipes, setRecipes] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [newValues, setNewValues] = useState({});
  const [newRecipeName, setNewRecipeName] = useState("");

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
    setNewRecipeName(recipeName);
    setNewValues(recipeData);
  };

  const handleSave = () => {
    const db = getDatabase();
    if (newRecipeName !== currentRecipe) {
      const oldRecipeRef = ref(db, `recipes/${currentRecipe}`);
      const newRecipeRef = ref(db, `recipes/${newRecipeName}`);
      remove(oldRecipeRef);
      update(newRecipeRef, newValues);
    } else {
      const recipeRef = ref(db, `recipes/${currentRecipe}`);
      update(recipeRef, newValues);
    }
    setEditMode(false);
    setCurrentRecipe(null);
    setNewValues({});
  };

  const handleCancel = () => {
    setEditMode(false);
    setCurrentRecipe(null);
    setNewValues({});
  };

  const handleChange = (e, productId, field) => {
    const { value } = e.target;
    setNewValues((prevValues) => ({
      ...prevValues,
      products: {
        ...prevValues.products,
        [productId]: {
          ...prevValues.products[productId],
          [field]: value,
        },
      },
    }));
  };

  const handleProductNameChange = (e, oldProductId) => {
    const { value } = e.target;
    const newProducts = { ...newValues.products };
    newProducts[value] = newProducts[oldProductId];
    delete newProducts[oldProductId];

    setNewValues((prevValues) => ({
      ...prevValues,
      products: newProducts,
    }));
  };

  return (
    <div className={`container mx-auto p-4 ${darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}>
      <h1 className="text-3xl font-bold mb-4">Kaydedilen Tarifler</h1>
      {Object.keys(recipes).length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.entries(recipes).map(([recipeName, recipeData]) => (
            <div key={recipeName} className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg shadow-md">
              {editMode && currentRecipe === recipeName ? (
                <div>
                  <input
                    type="text"
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    className="text-2xl font-semibold mb-2 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
                  />
                  <ul className="mb-2">
                    {Object.entries(recipeData.products).map(([productId, product]) => (
                      <li key={productId} className="text-sm mb-2">
                        <input
                          type="text"
                          value={productId.replace("_", " ")}
                          onChange={(e) => handleProductNameChange(e, productId)}
                          className="px-2 py-1 border border-stone-300 rounded-md mr-2 mb-1 w-full dark:bg-stone-700 dark:text-white"
                        />
                        <input
                          type="text"
                          name="value"
                          value={newValues.products[productId].value}
                          onChange={(e) => handleChange(e, productId, "value")}
                          className="px-2 py-1 border border-stone-300 rounded-md mr-2 mb-1 w-full dark:bg-stone-700 dark:text-white"
                        />
                        {product.unit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-md w-full mt-2"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-red-500 text-white rounded-md w-full mt-2 ml-2"
                    >
                      Düzenlemeyi İptal Et
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{recipeName}</h2>
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
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleEdit(recipeName, recipeData)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(recipeName)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Sil
                    </button>
                  </div>
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
