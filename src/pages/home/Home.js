import React, { useState } from "react";

const Home = ({ darkMode }) => {
  const initialValues = {
    kabuk: 25,
    sitrikAsit: 30,
    sekerSurubu: 1000,
    meyveSuyu: 150,
  };

  const [values, setValues] = useState(initialValues);

  const updateValues = (factor, source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      if (source !== "kabuk") {
        newValues.kabuk = (initialValues.kabuk * factor).toFixed(2);
      }
      if (source !== "sitrikAsit") {
        newValues.sitrikAsit = (initialValues.sitrikAsit * factor).toFixed(2);
      }
      if (source !== "sekerSurubu") {
        newValues.sekerSurubu = (initialValues.sekerSurubu * factor).toFixed(2);
      }
      if (source !== "meyveSuyu") {
        newValues.meyveSuyu = (initialValues.meyveSuyu * factor).toFixed(2);
      }
      return newValues;
    });
  };

  const handleInputChange = (e, source) => {
    const value = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [source]: value,
    }));

    const floatValue = parseFloat(value);
    if (!isNaN(floatValue) && floatValue > 0) {
      const factor = floatValue / initialValues[source];
      updateValues(factor, source);
    }
  };

  const increaseAmount = (source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      newValues[source] = (parseFloat(newValues[source]) + 1).toFixed(2);
      const factor = newValues[source] / initialValues[source];
      updateValues(factor, source);
      return newValues;
    });
  };

  const decreaseAmount = (source) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };
      const newValue = parseFloat(newValues[source]) - 1;
      if (newValue >= 0) {
        newValues[source] = newValue.toFixed(2);
        const factor = newValues[source] / initialValues[source];
        updateValues(factor, source);
      }
      return newValues;
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return (
    <div
      className={`lg:min-h-screen flex flex-col lg:px-96 min-h-full mx-auto p-4 ${darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}
    >
      <div className="mb-4">
        <label htmlFor="kabuk" className="block text-sm font-medium mb-1">
          Kabuk (gram):
        </label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            id="kabuk"
            value={values.kabuk}
            onChange={(e) => handleInputChange(e, "kabuk")}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? "bg-stone-800 border-stone-700 text-white" : "bg-white border-stone-300 text-stone-900"}`}
          />
          <button
            onClick={() => increaseAmount("kabuk")}
            className="ml-2 px-3 py-2 bg-cyan-500 text-white rounded-md"
          >
            +
          </button>
          <button
            onClick={() => decreaseAmount("kabuk")}
            className="ml-2 px-3 py-2 bg-pink-700 text-white rounded-md"
          >
            -
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="sitrikAsit" className="block text-sm font-medium mb-1">
          Sitrik Asit (gram):
        </label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            id="sitrikAsit"
            value={values.sitrikAsit}
            onChange={(e) => handleInputChange(e, "sitrikAsit")}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? "bg-stone-800 border-stone-700 text-white" : "bg-white border-stone-300 text-stone-900"}`}
          />
          <button
            onClick={() => increaseAmount("sitrikAsit")}
            className="ml-2 px-3 py-2 bg-cyan-500 text-white rounded-md"
          >
            +
          </button>
          <button
            onClick={() => decreaseAmount("sitrikAsit")}
            className="ml-2 px-3 py-2 bg-pink-700 text-white rounded-md"
          >
            -
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="sekerSurubu" className="block text-sm font-medium mb-1">
          Şeker Şurubu (ml):
        </label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            id="sekerSurubu"
            value={values.sekerSurubu}
            onChange={(e) => handleInputChange(e, "sekerSurubu")}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? "bg-stone-800 border-stone-700 text-white" : "bg-white border-stone-300 text-stone-900"}`}
          />
          <button
            onClick={() => increaseAmount("sekerSurubu")}
            className="ml-2 px-3 py-2 bg-cyan-500 text-white rounded-md"
          >
            +
          </button>
          <button
            onClick={() => decreaseAmount("sekerSurubu")}
            className="ml-2 px-3 py-2 bg-pink-700 text-white rounded-md"
          >
            -
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="meyveSuyu" className="block text-sm font-medium mb-1">
          Meyve Suyu (ml):
        </label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            id="meyveSuyu"
            value={values.meyveSuyu}
            onChange={(e) => handleInputChange(e, "meyveSuyu")}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? "bg-stone-800 border-stone-700 text-white" : "bg-white border-stone-300 text-stone-900"}`}
          />
          <button
            onClick={() => increaseAmount("meyveSuyu")}
            className="ml-2 px-3 py-2 bg-cyan-500 text-white rounded-md"
          >
            +
          </button>
          <button
            onClick={() => decreaseAmount("meyveSuyu")}
            className="ml-2 px-3 py-2 bg-pink-700 text-white rounded-md"
          >
            -
          </button>
        </div>
      </div>
      <button
        onClick={resetValues}
        className="px-4 py-2 bg-cyan-500 text-white rounded-md"
      >
        Sıfırla
      </button>
    </div>
  );
};

export default Home;
