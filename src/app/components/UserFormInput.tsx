"use client";
import React from "react";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://q99challenge-g0fd8oh07-eloy-mazzas-projects.vercel.app/";

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
    fetch(`${url}api/gpt?input=${inputValue}`, {
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*"
      }
    })
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
      const resp = await fetch(`${url}api/gpt`, {
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
      <h1>OpenAI Chat</h1>
      <div>
        <input
          type='text'
          placeholder='Enter something'
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type='button' onClick={send}>
          {" "}
          Send{" "}
        </button>
      </div>

      <p>{outputValue ? outputValue : "El resultado se mostrara aqui"}</p>

      <div>
        <h3>Embedding</h3>
        <button type='button' onClick={embed}>
          Embed
        </button>
        <p>{embedding ? embedding : "El embedding se mostrara aqui"}</p>
      </div>
    </>
  );
};

export default UserFormInput;
