import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodoTableRow from "./TodoTableRow";

//
export default function BasicTable() {
  const todoContext = useContext(TodoContext);
  const todos = todoContext.todos;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {todos.map((todo) => (
            <TodoTableRow todo={todo} key={todo.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
