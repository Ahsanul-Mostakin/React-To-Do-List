import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";
import Input from "./Input";
import Footer from "./Footer";

function App() {
  const [items, setItems] = useState([]);
  const [archivedItems, setArchivedItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.timerRunning) {
            return { ...item, timeElapsed: item.timeElapsed + 1 };
          } else if (item.breakRunning) {
            return { ...item, breakElapsed: item.breakElapsed + 1 };
          }
          return item;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function addItems(text, targetTimeInSeconds) {
    setItems((prev) => [
      ...prev,
      {
        text,
        isCompleted: false,
        timeElapsed: 0,
        breakElapsed: 0,
        timerRunning: false,
        breakRunning: false,
        targetTime: targetTimeInSeconds || 0,
      },
    ]);
  }

  function toggleComplete(id) {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      const deleted = prevItems[id];
      setArchivedItems((prevArchived) => [
        ...prevArchived,
        { ...deleted, deletedAt: new Date().toISOString() },
      ]);
      return prevItems.filter((_, index) => index !== id);
    });
  }

  function restoreItem(id) {
    setArchivedItems((prevArchived) => {
      const restored = prevArchived[id];
      setItems((prevItems) => [...prevItems, restored]);
      return prevArchived.filter((_, index) => index !== id);
    });
  }

  function toggleTimer(id) {
    setItems((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, timerRunning: !item.timerRunning } : item
      )
    );
  }

  function toggleBreak(id) {
    setItems((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, breakRunning: !item.breakRunning } : item
      )
    );
  }

  function resetTimer(id) {
    setItems((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, timeElapsed: 0, timerRunning: false } : item
      )
    );
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <Input addItems={addItems} />

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Active Tasks */}
        <div
          className="task-list"
          style={{
            flex: "1",
            minWidth: "300px",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "#ffeaa7",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🟢 Active Tasks</h2>
          <ul style={{ padding: 0 }}>
            {items.map((todoitem, index) => (
              <ToDo
                key={index}
                id={index}
                text={todoitem.text}
                isCompleted={todoitem.isCompleted}
                timeElapsed={todoitem.timeElapsed}
                breakElapsed={todoitem.breakElapsed}
                timerRunning={todoitem.timerRunning}
                breakRunning={todoitem.breakRunning}
                targetTime={todoitem.targetTime}
                toggleComplete={toggleComplete}
                onChecked={deleteItem}
                toggleTimer={toggleTimer}
                resetTimer={resetTimer}
                toggleBreak={toggleBreak}
              />
            ))}
          </ul>
        </div>

        {/* Archived Tasks */}
        <div
          className="task-list"
          style={{
            flex: "1",
            minWidth: "300px",
            maxHeight: "70vh",
            overflowY: "auto",
            background: "#dfe6e9",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🗃️ Archived Tasks</h2>
          {archivedItems.length === 0 ? (
            <p>No completed or deleted tasks yet.</p>
          ) : (
            <ul style={{ padding: 0 }}>
              {archivedItems.map((archivedItem, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      textDecoration: archivedItem.isCompleted
                        ? "line-through"
                        : "none",
                      color: archivedItem.isCompleted ? "gray" : "black",
                    }}
                  >
                    {archivedItem.text}
                  </span>

                  <button
                    onClick={() => restoreItem(index)}
                    style={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      border: "1px solid #999",
                      backgroundColor: "#b2bec3",
                    }}
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
