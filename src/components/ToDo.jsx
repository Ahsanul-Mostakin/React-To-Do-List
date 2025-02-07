import React from "react";

function ToDo(props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
  
      <li>{props.text}</li>

      <button
        onClick={(e) => {
          e.stopPropagation(); 
          props.onChecked(props.id);
        }}
        style={{
          backgroundColor: "#fdcb6e",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ToDo;
