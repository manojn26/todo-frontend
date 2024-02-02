import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ListAllTodos from "./components/ListAllTodos";
import TodoCreate from "./components/TodoCreate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Created Routings For Different Paths */}
          <Route path='/' element={<ListAllTodos />} />
          <Route path='/todo' element={<ListAllTodos />} />
          <Route path='/create-todo' element={<TodoCreate />} />
          <Route path='/edit-todo/:id' element={<TodoCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
