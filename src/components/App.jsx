import React, { useState } from "react";
import ToDo from "./ToDo";
import Input from "./Input";
import Footer from './Footer'; 

function App() {
  const [items, setItems] = useState([]);

  function addItems(inputText) {
    setItems((prev) => {
      return [...prev, inputText];
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <Input addItems={addItems} />
      <div>
        <ul>
          {items.map((todoitem, index) => (
            <ToDo
              key={index}
              id={index}
              text={todoitem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default App;
