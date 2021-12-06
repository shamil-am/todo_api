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
    if (todo.name === "") return;
    let response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await getTodos();
      alert.show(`${todo.name} added!`);
    } else {
      window.alert("Error occured!");
    }
  };

  const removeTodo = async (targetTodo) => {
    let result = await fetch(`http://localhost:3000/todos/${targetTodo.id}`, {
      method: "DELETE",
    });
    if (result.ok) {
      setTodos((prevState) => {
        return prevState.filter((todo) => {
          return todo.id !== targetTodo.id;
        });
      });
      alert.show(`${targetTodo.name} deleted!`);
    } else {
      window.alert("Error occured!");
    }
  };

  //effects
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <TodoContext.Provider value={{ todos, removeTodo, addNewTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default withAlert()(TodoContextProvider);
