"use client"

import { useState } from "react";
import { NewToDoForm } from "./_components/new-todo-form";

type ToDoItem = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: 1, title: "Example", description: "This is an example", completed: false },
  ]);

  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-Do List</h1>
      <ul className="space-y-2">
        {todos.map(({ id, title, description, completed }) => (
          <ToDoItem
            key={id}
            title={title}
            description={description}
            completed={completed}
            onCompleteChanged={(newValue) => {
              setTodos((prev) => {
                return prev.map((todo) =>
                  todo.id === id ? { ...todo, completed: newValue } : todo
                );
              });
            }}
            onRemove={() => handleRemove(id)}
          />
        ))}
      </ul>
      <NewToDoForm
        onCreate={(title, description) => {
          setTodos((prev) => [
            ...prev,
            { id: Date.now(), title, description, completed: false },
          ]);
        }}
      />
    </div>
  );

  function handleRemove(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
}

function ToDoItem({
  title,
  description,
  completed,
  onCompleteChanged,
  onRemove,
}: {
  title: string;
  description: string;
  completed: boolean;
  onCompleteChanged: (newValue: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex gap-2 items-center border rounded p-2 w-full">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => onCompleteChanged(e.target.checked)}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button className="text-red-500" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
    </li>
  );
}
