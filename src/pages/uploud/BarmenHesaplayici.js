import React, { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";

const BarmenHesaplayici = ({ darkMode }) => {
  const [newProducts, setNewProducts] = useState({});
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productUnit, setProductUnit] = useState("gram");
  const [recipeName, setRecipeName] = useState("");
  const [totals, setTotals] = useState({ gram: 0, ml: 0, cl: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [darkMode]);

  const addNewProduct = () => {
    if (
      productName &&
      !isNaN(parseFloat(productAmount)) &&
      parseFloat(productAmount) > 0
    ) {
      const productId = productName.replace(/\s+/g, "_").toLowerCase();
      const updatedProducts = {
        ...newProducts,
        [productId]: {
          initial: parseFloat(productAmount),
          unit: productUnit,
          value: parseFloat(productAmount).toFixed(2),
        },
      };
      setNewProducts(updatedProducts);
      updateTotal(updatedProducts);

      // Clear input fields after adding a product
      setProductName("");
      setProductAmount("");
      setProductUnit("gram");
    }
  };

  const updateFromNewProduct = (productId, value) => {
    const productAmount = parseFloat(value);
    if (!isNaN(productAmount) && productAmount >= 0) {
      const updatedProducts = { ...newProducts };
      updatedProducts[productId].value = productAmount.toFixed(2);
      setNewProducts(updatedProducts);
      updateTotal(updatedProducts);
    }
  };

  const updateTotal = (products) => {
    const totals = { gram: 0, ml: 0, cl: 0 };
    for (const key in products) {
      const unit = products[key].unit;
      const value = parseFloat(products[key].value) || 0;
      totals[unit] += value;
    }
    setTotals(totals);
  };

  const resetValues = () => {
    const resetProducts = { ...newProducts };
    for (const key in resetProducts) {
      resetProducts[key].value = resetProducts[key].initial;
    }
    setNewProducts(resetProducts);
    updateTotal(resetProducts);
  };

  const increaseAmount = (productId) => {
    const updatedProducts = { ...newProducts };
    updatedProducts[productId].value = (
      parseFloat(updatedProducts[productId].value) + 1
    ).toFixed(2);
    setNewProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  const decreaseAmount = (productId) => {
    const updatedProducts = { ...newProducts };
    const newValue = parseFloat(updatedProducts[productId].value) - 1;
    if (newValue >= 0) {
      updatedProducts[productId].value = newValue.toFixed(2);
      setNewProducts(updatedProducts);
      updateTotal(updatedProducts);
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = { ...newProducts };
    delete updatedProducts[productId];
    setNewProducts(updatedProducts);
    updateTotal(updatedProducts);
  };

  const saveRecipe = async () => {
    if (recipeName) {
      setLoading(true);
      const db = getDatabase();
      try {
        await set(ref(db, "recipes/" + recipeName), {
          products: newProducts,
          totals: totals,
        });
        setRecipeName("");
        alert("Reçete başarıyla kaydedildi!");
      } catch (error) {
        console.error("Reçete kaydedilemedi:", error);
        alert("Reçete kaydedilemedi, lütfen tekrar deneyin.");
      }
      setLoading(false);
    } else {
      alert("Lütfen bir reçete ismi girin.");
    }
  };

  return (
    <div
      className={`lg:px-96 mx-auto p-4 ${
        darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">Reçete Ekle</h1>

      <h2 className="text-xl font-semibold mb-2">Yeni Ürün Ekle</h2>
      <div className="mb-4">
        <label htmlFor="yeni_urun_isim" className="block text-sm font-medium">
          Ürün İsmi:
        </label>
        <input
          placeholder="isim"
          type="text"
          id="yeni_urun_isim"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full px-3 py-2 border border-stone-300 rounded-md mb-2 ${
            darkMode ? "bg-stone-700 text-white" : "bg-white text-stone-900"
          }`}
        />
        <label htmlFor="yeni_urun_miktar" className="block text-sm font-medium">
          Miktar:
        </label>
        <input
          placeholder="miktar"
          type="number"
          id="yeni_urun_miktar"
          value={productAmount}
          onChange={(e) => setProductAmount(e.target.value)}
          className={`w-full px-3 py-2 border border-stone-300 rounded-md mb-2 ${
            darkMode ? "bg-stone-700 text-white" : "bg-white text-stone-900"
          }`}
        />
        <label htmlFor="yeni_urun_birim" className="block text-sm font-medium">
          Birim:
        </label>
        <select
          id="yeni_urun_birim"
          value={productUnit}
          onChange={(e) => setProductUnit(e.target.value)}
          className={`w-full px-3 py-2 border border-stone-300 rounded-md mb-2 ${
            darkMode ? "bg-stone-700 text-white" : "bg-white text-stone-900"
          }`}
        >
          <option value="gram">gram</option>
          <option value="ml">ml</option>
          <option value="cl">cl</option>
        </select>
        <button
          onClick={addNewProduct}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Ürün Ekle
        </button>
        <button
          onClick={resetValues}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Sıfırla
        </button>
      </div>
      <div id="newProductSection">
        {Object.entries(newProducts).map(([productId, product]) => (
          <div key={productId} className="flex items-center mb-2">
            <label htmlFor={productId} className="flex-1">
              {productId.replace("_", " ")} ({product.unit}):
            </label>
            <input
              type="number"
              id={productId}
              value={product.value}
              onChange={(e) => updateFromNewProduct(productId, e.target.value)}
              className={`w-20 px-2 py-1 border rounded-md mx-2 ${
                darkMode ? "bg-stone-700 text-white border-stone-600" : "bg-white text-stone-900 border-stone-300"
              }`}
            />
            <button
              onClick={() => increaseAmount(productId)}
              className="px-2 py-1 bg-green-500 text-white rounded-md mx-1"
            >
              +
            </button>
            <button
              onClick={() => decreaseAmount(productId)}
              className="px-2 py-1 bg-yellow-500 text-white rounded-md mx-1"
            >
              -
            </button>
            <button
              onClick={() => deleteProduct(productId)}
              className="px-2 py-1 bg-red-500 text-white rounded-md mx-1"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Genel Toplam</h2>
        <p id="genel_toplam">Toplam Gram: {totals.gram.toFixed(2)}</p>
        <p id="genel_toplam">Toplam ML: {totals.ml.toFixed(2)}</p>
        <p id="genel_toplam">Toplam CL: {totals.cl.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Reçete Kaydet</h2>
        <label htmlFor="recete_isim" className="block text-sm font-medium">
          Reçete İsmi:
        </label>
        <input
          placeholder="Reçete ismi"
          type="text"
          id="recete_isim"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          className={`w-full px-3 py-2 border border-stone-300 rounded-md my-2 ${
            darkMode ? "bg-stone-700 text-white" : "bg-white text-stone-900"
          }`}
        />
        <button
          onClick={saveRecipe}
          className="px-4 py-2 bg-blue-500 w-full text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
};

export default BarmenHesaplayici;
