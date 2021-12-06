import { createContext, useEffect, useState } from "react";
import { withAlert } from "react-alert";

export const TodoContext = createContext();

///
const TodoContextProvider = ({ children, alert }) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const result = await fetch("http://localhost:3000/todos");
    const response = await result.json();
    setTodos(response);
  };

  const addNewTodo = async (todo) => {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
    //after addition get all todos again with new todo
    await getTodos();
    alert.show(`${todo.name} added!`);
  };

  const removeTodo = async (targetTodo) => {
    await fetch(`http://localhost:3000/todos/${targetTodo.id}`, {
      method: "DELETE",
    });
    await getTodos();
    alert.show(`${targetTodo.name} deleted!`);
  };

  const editTodo = (todo) => {
    //   const input = document.getElementById(todo.id);
    //   input.disabled = false;
    //   input.focus();
    //   console.log(input.disabled);
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <TodoContext.Provider value={{ todos, removeTodo, addNewTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default withAlert()(TodoContextProvider);
