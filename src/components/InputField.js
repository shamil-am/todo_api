import { useState, forwardRef } from "react";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";

const StyledInputElement = styled("input")`
  width: 200px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 220px;
    transition: width 200ms ease-out;
  }
`;

const CustomInput = forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }}
      {...props}
      ref={ref}
    />
  );
});

export default function UnstyledInput() {
  const [todo, setTodo] = useState({ name: "" });
  const todoContext = useContext(TodoContext);
  const addTodo = todoContext.addNewTodo;
  //
  const handleValue = (e) => {
    setTodo({ name: e.target.value });
  };
  const handleClick = () => {
    addTodo(todo);
    setTodo({ name: "" });
  };

  return (
    <div style={{ display: "flex" }}>
      <CustomInput
        aria-label="Demo input"
        placeholder="Type something..."
        value={todo.name}
        onChange={handleValue}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        style={{ marginLeft: "1rem" }}
        onClick={handleClick}
      >
        Add
      </Button>
    </div>
  );
}
