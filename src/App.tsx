import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTrashAlt } from "react-icons/fa";

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
    localStorage.setItem("todoList", JSON.stringify([...todoList, newTodo]));
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
        <h1 className="text-3xl font-bold m-10">Todo in React</h1>
      </header>
      <main>
        <section>
          <h2>Vad behöver jag göra?</h2>
          <form className="flex items-center m-5">
            <input
              type="text"
              id="todo-text"
              className="text-black h-5"
              placeholder="Skriv.."
            />
            <button
              type="button"
              className="bg-violet-500 p-2 mx-2"
              onClick={handleSubmit}
            >
              Lägg till
            </button>
          </form>
        </section>
        <section>
          <ul className="">
            {todoList.map((todo) => (
              <li className="flex justify-between" onClick={handleDeleteItem}>
                <h3>{todo}</h3>
                <FaTrashAlt />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
