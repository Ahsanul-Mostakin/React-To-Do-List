import React from "react";

function ToDo(props) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const displayTime =
    props.targetTime > 0
      ? Math.max(props.targetTime - props.timeElapsed, 0)
      : props.timeElapsed;

  return (
    <li
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff8e1",
        borderRadius: "8px",
        marginBottom: "10px",
        gap: "10px",
      }}
    >
      {/* Task Text */}
      <span
        style={{
          textDecoration: props.isCompleted ? "line-through" : "none",
          color: props.isCompleted ? "gray" : "inherit",
          fontSize: "1rem",
          lineHeight: "1.5",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {props.text}
      </span>

      {/*  Timer Row */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "monospace", minWidth: "60px" }}>
          ⏱️ {formatTime(displayTime)}
        </span>
        <button
          onClick={() => props.toggleTimer(props.id)}
          style={{
            backgroundColor: props.timerRunning ? "#fab1a0" : "#74b9ff",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {props.timerRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => props.resetTimer(props.id)}
          style={{
            backgroundColor: "#dfe6e9",
            border: "1px solid #888",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* ☕ Break Row – starts on a new line for clarity */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "monospace", minWidth: "60px" }}>
          ☕ {formatTime(props.breakElapsed)}
        </span>
        <button
          onClick={() => props.toggleBreak(props.id)}
          style={{
            backgroundColor: props.breakRunning ? "#ffeaa7" : "#81ecec",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {props.breakRunning ? "Stop Break" : "Start Break"}
        </button>
      </div>

      {/*  Complete &  Delete */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => props.toggleComplete(props.id)}
          style={{
            backgroundColor: props.isCompleted ? "#55efc4" : "#ffeaa7",
            border: "1px solid #999",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {props.isCompleted ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => props.onChecked(props.id)}
          style={{
            backgroundColor: "#fdcb6e",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ToDo;
