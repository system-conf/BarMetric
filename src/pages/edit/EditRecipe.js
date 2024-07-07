import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = ({ darkMode }) => {
  const { recipeName } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [newValues, setNewValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [productNames, setProductNames] = useState({});
  const [totals, setTotals] = useState({ gram: 0, ml: 0, cl: 0 });
  const inputRefs = useRef({});

  useEffect(() => {
    const db = getDatabase();
    const recipeRef = ref(db, `recipes/${recipeName}`);
    onValue(recipeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRecipe(data);
        setNewValues(data);
        setProductNames(
          Object.keys(data.products).reduce((acc, productId) => {
            acc[productId] = productId.replace("_", " ");
            return acc;
          }, {})
        );
        calculateTotals(data.products);
      }
      setLoading(false);
    });
  }, [recipeName]);

  const calculateTotals = (products) => {
    const totals = { gram: 0, ml: 0, cl: 0 };
    Object.values(products).forEach((product) => {
      const value = parseFloat(product.value) || 0;
      totals[product.unit] += value;
    });
    setTotals(totals);
  };

  const handleSave = () => {
    const db = getDatabase();
    const updatedProducts = Object.entries(newValues.products).reduce(
      (acc, [productId, product]) => {
        const newProductId = productNames[productId]
          .replace(/\s+/g, "_")
          .toLowerCase();
        acc[newProductId] = product;
        return acc;
      },
      {}
    );
    const updatedValues = {
      ...newValues,
      products: updatedProducts,
      totals: totals,
    };
    update(ref(db, `recipes/${recipeName}`), updatedValues).then(() => {
      navigate("/RecipeList");
    });
  };

  const handleCancel = () => {
    navigate("/RecipeList");
  };

  const handleChange = (e, productId, field) => {
    const value = e.target.value;
    setNewValues((prevValues) => {
      const updatedProducts = {
        ...prevValues.products,
        [productId]: {
          ...prevValues.products[productId],
          [field]: value,
        },
      };
      calculateTotals(updatedProducts);
      return {
        ...prevValues,
        products: updatedProducts,
      };
    });
  };

  const handleAmountChange = (e, productId) => {
    const value = e.target.value;
    if (isNaN(parseFloat(value))) return;
    setNewValues((prevValues) => {
      const updatedProducts = {
        ...prevValues.products,
        [productId]: {
          ...prevValues.products[productId],
          value: value,
        },
      };
      calculateTotals(updatedProducts);
      return {
        ...prevValues,
        products: updatedProducts,
      };
    });
  };

  const handleProductNameChange = (e, oldProductId) => {
    const { value } = e.target;
    setProductNames((prevNames) => ({
      ...prevNames,
      [oldProductId]: value,
    }));
  };

  const handleDelete = (productId) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      setNewValues((prevValues) => {
        const newProducts = { ...prevValues.products };
        delete newProducts[productId];
        calculateTotals(newProducts);
        return {
          ...prevValues,
          products: newProducts,
        };
      });
      setProductNames((prevNames) => {
        const newNames = { ...prevNames };
        delete newNames[productId];
        return newNames;
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  return (
    <div
      className={`container mx-auto p-4 ${
        darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Tarifi Düzenle</h1>
      <div>
        <input
          type="text"
          value={recipeName}
          readOnly
          className="text-2xl font-semibold mb-4 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
        />
        {Object.entries(newValues.products).map(([productId, product]) => (
          <div
            key={productId}
            className={`mb-4 p-4 rounded-md ${
              darkMode ? "bg-stone-800" : "bg-stone-200"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">
                  Ürün İsmi:
                </label>
                <input
                  type="text"
                  value={productNames[productId]}
                  onChange={(e) => handleProductNameChange(e, productId)}
                  className="mb-2 px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
                />
              </div>
              <button
                onClick={() => handleDelete(productId)}
                className="ml-2 px-3 py-2 mt-3 bg-red-500 text-white rounded-md"
              >
                Sil
              </button>
            </div>
            <div className="flex items-center mb-2">
              <div className="flex-grow">
                <label className="block text-sm font-medium mb-1">Miktar:</label>
                <input
                  type="number"
                  value={product.value}
                  onChange={(e) => handleAmountChange(e, productId)}
                  className="px-2 py-1 border border-stone-300 rounded-md w-full dark:bg-stone-700 dark:text-white"
                />
              </div>
              <div className="ml-4">
                <label className="block text-sm font-medium mb-1">Birim:</label>
                <select
                  value={product.unit}
                  onChange={(e) => handleChange(e, productId, "unit")}
                  className="px-2 py-1 border border-stone-300 rounded-md w-24 dark:bg-stone-700 dark:text-white"
                >
                  <option value="gram">gram</option>
                  <option value="ml">ml</option>
                  <option value="cl">cl</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Toplamlar</h2>
          <p>Toplam Gram: {totals.gram.toFixed(2)}</p>
          <p>Toplam ML: {totals.ml.toFixed(2)}</p>
          <p>Toplam CL: {totals.cl.toFixed(2)}</p>
        </div>
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
    </div>
  );
};

export default EditRecipe;
