import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([] as string[]);

  useEffect(() => {
    const todoList = localStorage.getItem("todoList");

    if (todoList) {
      setTodoList(JSON.parse(todoList));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const input = document.getElementById("todo-text") as HTMLInputElement;
    const newTodo = input.value;
    setTodoList([...todoList, newTodo]);
    input.value = "";
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  const handleDeleteItem = (event: React.MouseEvent<HTMLLIElement>) => {
    const item = event.currentTarget;
    const index = todoList.indexOf(item.innerText);
    todoList.splice(index, 1);
    setTodoList([...todoList]);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  return (
    <div className="App text-white">
      <header>
        <h1 className="text-3xl font-bold">Todo in React</h1>
      </header>
      <main>
        <section>
          <h2>Vad behöver jag göra?</h2>
          <ul>
            {todoList.map((todo) => (
              <li className="flex" onClick={handleDeleteItem}>
                <h3>{todo}</h3>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Lägg till i din lista:</h2>
          <form className="flex flex-col">
            <input
              type="text"
              id="todo-text"
              className="text-black"
              placeholder="Skriv.."
            />
            <button type="submit" onClick={handleSubmit}>
              Lägg till
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
