import React, {Fragment} from 'react';
import { NewTodo } from "./components/NewTodo";
import { TodoList } from "./components/TodoList";
import { FilterTodo } from "./components/FilterTodo";
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
      <Fragment>
          <h1 className="text-center mb-4">Todo App</h1>
          <NewTodo/>
          <TodoList/>
          <FilterTodo/>
      </Fragment>
  );
}

export default App;
