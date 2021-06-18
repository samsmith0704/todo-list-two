import React from "react";
import { useState, useEffect } from "react";
import Todo from "./Todo";

const TdList = () => {
  const [todos, setTodos] = useState([]);

  //To do this with ids, create unique ids using state, increment the state id by one every time a todo is added
  //determine whether button should be disabled
  const [text, setText] = useState("");
  const [btncolor, setBtncolor] = useState("grey");

  /* 
  The following two useEffects are meant to store the todos 
  between page refreshes 
  */

  //Either get the array of todos in local storage, or set the todos to a null array
  useEffect(() => {
    const parsedTodos =
      JSON.parse(localStorage.getItem("todos")) || Array(10).fill(null);

    setTodos(parsedTodos);
  }, []);

  //When the todos array changes, set the local storage to the new todo list
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const btnStyle = {
    border: ".1px solid white",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: btncolor,
    color: "white",
  };

  const addTodo = () => {
    //Could probably do this in a better way
    // const newTodo = <Todo text={document.getElementById("todo-input").value} />;

    const newTodo = {
      text,
      done: false,
    };
    document.getElementById("todo-input").value = "";
    setText("");
    setTodos([newTodo, ...todos]);
    console.log(todos);
  };

  /* 
If user adds text, button changes to blue
if the text is empty, button needs to be grey  
*/
  useEffect(() => {
    if (text) {
      setBtncolor("Navy");
    } else setBtncolor("grey");
  }, [text]);

  const handleTextChange = () => {
    setText(document.getElementById("todo-input").value);
  };

  //DELETE WORKS!
  const handleDelete = (todoToDelete) => {
    const newTodos = todos.filter((todo) => {
      return todoToDelete !== todo;
    });
    setTodos(newTodos);
  };

  const inputStyle = {
    margin: "5px",
  };
  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        style={inputStyle}
        id="todo-input"
        placeholder="add item..."
        onChange={handleTextChange}
      ></input>
      <button style={btnStyle} onClick={addTodo} disabled={!text}>
        ADD
      </button>

      <p>
        {" "}
        {todos.map((todo, i) => {
          return (
            <div>
              <Todo
                text={todo.text}
                done={todo.done}
                handleClick={() => {
                  //can use i because of closure
                  const newTodos = [...todos];
                  newTodos[i].done = !newTodos[i].done;

                  setTodos(newTodos);
                }}
                handleDelete={() => handleDelete(todo)}
              />
            </div>
          );
        })}{" "}
      </p>
    </div>
  );
};

export default TdList;
