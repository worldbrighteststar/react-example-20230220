import "./App.css";
import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/counter")
      .then((resp) => resp.json())
      .then((result) => setCount(result.value));
  }, []);

  /*
  back-end server 생성 필요
  terminal : npx json-server --watch --port 9999 db.json
  */
  const change = async (value) => {
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: count + value }),
    };

    // fetch("http://localhost:9999/counter", option)
    //   .then((resp) => resp.json())
    //   .then((result) => {
    //     setCount(result.value);
    //   });
    const resp = await fetch("/counter", option);
    const result = await resp.json();
    setCount(result.value);
  };

  const up = () => change(1);
  const down = () => change(-1);
  const reset = () => setCount(0);

  return [count, up, down, reset];
}

function Counter({ title, initialValue }) {
  const [count, up, down, reset] = useCounter();

  return (
    <div>
      <h1>{title}</h1>
      <button className={styles.spaceRight} onClick={up}>
        +
      </button>
      <button className={styles.spaceRight} onClick={down}>
        -
      </button>
      <button className={styles.spaceRight} onClick={reset}>
        reset
      </button>
      👉 {count}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter title="참여자 카운트" initialValue={0} />
    </div>
  );
}

export default App;
