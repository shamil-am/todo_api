import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useContext, useState, createRef } from "react";
import { TodoContext } from "../Context/TodoContext";
import styled from "styled-components";
import { useAlert } from "react-alert";
import { Modal } from "antd";

//styled
const TodoName = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: black;
  font-size: 18px;
  font-weight: bold;
  &:enabled {
    background-color: #cecece;
  }
`;
///
const TodoTableRow = ({ todo }) => {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(todo.name);
  const [inputDefaultValue, setInputDefaultValue] = useState(todo.name);
  const inputRef = createRef();
  const todoContext = useContext(TodoContext);
  const removeTodo = todoContext.removeTodo;
  const alert = useAlert();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure to delete?");

  // --modal
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("Deleting...");
    setConfirmLoading(true);
    setVisible(false);
    setConfirmLoading(false);
    removeTodo(todo); //after ok clicked remove item
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  // modal--
  //
  const handleRemove = () => {
    showModal();
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const btnEdit = () => {
    setEditable(true);
    inputRef.current.focus();
  };
  const btnSave = async (todo) => {
    // db operation
    let result = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: inputValue }),
      headers: { "Content-Type": "application/json" },
    });
    if (result.ok) {
      setEditable(false);
      alert.show(`Saved`);
      setInputDefaultValue(inputValue);
    } else {
      window.alert("error occured");
    }
  };
  const btnCancel = () => {
    setEditable(false);
    setInputValue(inputDefaultValue);
  };
  return (
    <>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <TableRow
        key={todo.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <TodoName
            value={inputValue}
            disabled={!editable}
            ref={inputRef}
            onChange={handleInputChange}
          />
        </TableCell>
        <TableCell>
          {editable ? (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={() => btnSave(todo)}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<SaveIcon />}
                onClick={btnCancel}
                style={{ marginLeft: ".5rem" }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="warning"
              startIcon={<ModeEditOutlineIcon />}
              onClick={btnEdit}
            >
              Edit
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TodoTableRow;
