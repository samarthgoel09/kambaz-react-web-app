import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(7);

  console.log("Rendered with count =", count);

  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>

      <button
        onClick={() => {
          setCount(count + 1);
          console.log("New count:", count + 1);
        }}
        id="wd-counter-up-click"
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "8px",
        }}
      >
        Up
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
          console.log("New count:", count - 1);
        }}
        id="wd-counter-down-click"
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Down
      </button>

      <hr />
    </div>
  );
}
