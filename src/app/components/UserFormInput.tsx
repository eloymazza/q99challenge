"use client";
import React from "react";

const UserFormInput = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [outputValue, setOutputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [embedding, setEmbedding] = React.useState("");

  const handleInputChange = (userInput: string) => {
    setInputValue(userInput);
  };

  const send = () => {
    setLoading(true);
    fetch(`http://localhost:3000/api/gpt?input=${inputValue}`, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOutputValue(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const embed = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`http://localhost:3000/api/gpt`, {
        method: "POST",
        body: outputValue
      });
      const body = await resp.json();
      setEmbedding(JSON.stringify(body.embedding));
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <>
      <form>
        <input
          type='text'
          placeholder='Enter something'
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type='button' onClick={send}>
          {" "}
          Send{" "}
        </button>
      </form>
      <p>{outputValue ? outputValue : "El resultado se mostrara aqui"}</p>
      <button type='button' onClick={embed}>
        Embed
      </button>
      <p>{embedding ? embedding : "El embedding se mostrara aqui"}</p>
    </>
  );
};

export default UserFormInput;
