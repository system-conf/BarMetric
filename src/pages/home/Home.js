import React, { useState } from "react";

const Home = () => {
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
    <div className="container container-home">
      <h1 className="barmen-header">Barmen Hesaplayıcı</h1>
      <div className="productRow">
        <label htmlFor="kabuk" className="label marginsifir">
          Kabuk (gram):
        </label>
        <input
          style={{ marginBottom: 0 }}
          type="number"
          id="kabuk"
          value={values.kabuk}
          onChange={(e) => handleInputChange(e, "kabuk")}
          className="input"
        />
        <button
          onClick={() => increaseAmount("kabuk")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("kabuk")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="sitrikAsit" className="label marginsifir">
          Sitrik Asit (gram):
        </label>
        <input
          type="number"
          id="sitrikAsit"
          value={values.sitrikAsit}
          onChange={(e) => handleInputChange(e, "sitrikAsit")}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("sitrikAsit")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("sitrikAsit")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="sekerSurubu" className="label marginsifir">
          Şeker Şurubu (ml):
        </label>
        <input
          type="number"
          id="sekerSurubu"
          value={values.sekerSurubu}
          onChange={(e) => handleInputChange(e, "sekerSurubu")}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("sekerSurubu")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("sekerSurubu")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <div className="productRow">
        <label htmlFor="meyveSuyu" className="label marginsifir">
          Meyve Suyu (ml):
        </label>
        <input
          type="number"
          id="meyveSuyu"
          value={values.meyveSuyu}
          onChange={(e) => handleInputChange(e, "meyveSuyu")}
          className="input marginsifir"
        />
        <button
          onClick={() => increaseAmount("meyveSuyu")}
          className="adjustButton marginsifir"
        >
          +
        </button>
        <button
          onClick={() => decreaseAmount("meyveSuyu")}
          className="adjustButton marginsifir"
        >
          -
        </button>
      </div>
      <br />
      <button onClick={resetValues} className="button">
        Reset
      </button>
    </div>
  );
};

export default Home;
