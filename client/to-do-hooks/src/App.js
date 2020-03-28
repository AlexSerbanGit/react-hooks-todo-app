import React, {useState} from 'react';
import './App.css';

function Todo({ todo, index, changeStatus, deleteTodo }) {

  if(todo && todo.text){
    return <div style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}className="todo">

    {todo.text}

    <div>
      <button style={{marginRight: 5}} onClick={() => changeStatus(index)}>
        {
          todo.isCompleted ? 'completed' : 'complete'
        }
      </button>
      <button onClick={() => deleteTodo(index)}>
        Delete
      </button>
    </div>

  </div>;
  }

  return ('');

}

function TodoForm({addTodo}) {

  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>

      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} />

    </form>
  )

}

function App() {

  // localStorage.clear();

  const jsonTodos = localStorage.getItem('todos');

  const saveTodos = jsonTodos ? JSON.parse(jsonTodos) : [];

  console.log(saveTodos);

  const [todos, setTodos] = useState(saveTodos);
  
  const addTodo = text => {
    var newTodos = [...todos];
    if(newTodos.length > 0){
      newTodos = [...todos, {text}];
    }else{
      newTodos = [{text}];
    }
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    console.log(localStorage.getItem('todos'));
  }

  const changeStatus = index => {
    const newTodos = [...todos];
    if(newTodos[index].isCompleted){
      newTodos[index].isCompleted = false;
    }else{
      newTodos[index].isCompleted = true;
    }
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    console.log(localStorage.getItem('todos'));
  }

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    console.log(localStorage.getItem('todos'));
  } 

  return (

    <div className="app"> 

      <div className="todo-list">

        {todos.map((todo, index) => {
          return <Todo key={index} index={index} todo={todo} changeStatus={changeStatus} deleteTodo={deleteTodo} />
        })}

        <TodoForm addTodo={addTodo} />

      </div>

    </div>

  )

}

export default App;