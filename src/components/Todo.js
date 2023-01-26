import React, { useEffect, useState } from "react";
import todo from "../images/todo.PNG";
import "./Todo.css";

const getLocalData = () => {
   const lists = localStorage.getItem("mytodolist"); 

   if(lists){
     return JSON.parse(lists); 
   }else{
     return []; 
   }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditedItem, setIsEditedItem] = useState(""); 
  const [toggleButton, setToggleButton] = useState(false); 

  const addItem = () => {
    if (!inputData) {
      alert('Pls fill the data'); 
    }else if(inputData && toggleButton){
       setItems(
         items.map((elem) => {
           if(elem.id === isEditedItem){
             return {...elem, name:inputData}
           }
           return elem; 
         })
       )
       setInputData(""); 
       setIsEditedItem(null); 
       setToggleButton(false); 
    }else{
      const myNewImputData = {
        id: new Date().getTime().toString(), 
        name: inputData
      }
      setItems([...items, myNewImputData]);
      setInputData("");
    }
  };

  const editItem = (id) => {
     const item_todo_edited = items.find((item) => {
       return item.id === id; 
     })
     setInputData(item_todo_edited.name); 
     setIsEditedItem(id); 
     setToggleButton(true); 
  }

  const deleteItem = (id) => {
    const updateItems = items.filter((elem) => {
      return elem.id !== id;
    });
    setItems(updateItems);
  };

  const removeAllItems = () => {
    setItems([]);
  };

  useEffect(() => {
     localStorage.setItem("mytodolist", JSON.stringify(items)); 
  }, [items]); 

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add your list here ✔ </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item here ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
              toggleButton ? <i
              className="far fa-edit add-btn"
              title="Save Edit Item"
              onClick={addItem}
            ></i> : <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            ></i>
            }
          </div>
          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                  <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* clear all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItems}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
