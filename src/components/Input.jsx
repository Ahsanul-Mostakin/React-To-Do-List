import React, { useState } from "react";

function Input(props) {
  const [inputText, setInputText] = useState("");
  const [targetHours, setTargetHours] = useState("");

  function handleAdd() {
    // Trim input
    const trimmedText = inputText.trim();
    const parsedTarget = parseFloat(targetHours);

    // Validation: Empty task
    if (trimmedText === "") {
      alert("⚠️ Please enter a task description.");
      return;
    }

    // Optional Validation: Invalid target hour
    if (targetHours && (isNaN(parsedTarget) || parsedTarget < 0)) {
      alert("⚠️ Target time must be a positive number.");
      return;
    }

    // All good → Add item
    props.addItems(trimmedText, parsedTarget > 0 ? parsedTarget * 60 : 0);
    setInputText("");
    setTargetHours("");
  }

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Enter task..."
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        style={{ marginBottom: "10px", width: "70%" }}
      />

      <input
        type="number"
        placeholder="Target hours (optional)"
        onChange={(e) => setTargetHours(e.target.value)}
        value={targetHours}
        style={{ marginBottom: "10px", width: "25%", marginLeft: "5%" }}
      />

      <button onClick={handleAdd}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default Input;
