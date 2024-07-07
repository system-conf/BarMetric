import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = ({ darkMode }) => {
  const { recipeName } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [newValues, setNewValues] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeName}`);
    onValue(recipeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRecipe(data);
        setNewValues(data);
      }
      setLoading(false);
    });
  }, [recipeName]);

  const handleSave = () => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeName}`);
    update(recipeRef, newValues).then(() => {
      navigate("/RecipeList");
    });
  };

  const handleCancel = () => {
    navigate("/RecipeList");
  };

  const handleChange = (e, productId, field) => {
    const value = e.target.value;
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
    if (value && value !== oldProductId) {
      const newProducts = { ...newValues.products };
      newProducts[value] = newProducts[oldProductId];
      delete newProducts[oldProductId];

      setNewValues((prevValues) => ({
        ...prevValues,
        products: newProducts,
      }));
    }
  };

  if (loading) {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  return (
    <div className={`container mx-auto p-4 ${darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}>
      <h1 className="text-3xl font-bold mb-4">Tarifi Düzenle</h1>
      <div>
        <input
          type="text"
          value={recipeName}
          readOnly
          className="text-2xl font-semibold mb-4 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
        />
        {Object.entries(newValues.products).map(([productId, product]) => (
          <div key={productId} className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Ürün İsmi:
            </label>
            <input
              type="text"
              value={productId.replace("_", " ")}
              onChange={(e) => handleProductNameChange(e, productId)}
              className="mb-2 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
            />
            <label className="block text-sm font-medium mb-1">
              Miktar:
            </label>
            <input
              type="number"
              value={product.value}
              onChange={(e) => handleChange(e, productId, "value")}
              className="mb-2 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
            />
            <label className="block text-sm font-medium mb-1">
              Birim:
            </label>
            <select
              value={product.unit}
              onChange={(e) => handleChange(e, productId, "unit")}
              className="mb-2 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
            >
              <option value="gram">gram</option>
              <option value="ml">ml</option>
              <option value="cl">cl</option>
            </select>
          </div>
        ))}
        <div className="flex justify-between">
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md w-full mt-2">
            Kaydet
          </button>
          <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded-md w-full mt-2 ml-2">
            Düzenlemeyi İptal Et
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
