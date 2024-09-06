"use client"

import { NewToDoForm } from "./_components/new-todo-form";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const todos = useQuery(api.functions.listTodos);
  return (
    <div className="max-w-screen-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">To-Do List</h1>
      <ul className="space-y-2">
        {todos?.map(({ _id, title, description, completed }, index) => (
          <ToDoItem
            key={index}
            id={_id}
            title={title}
            description={description}
            completed={completed}
          />
        ))}
      </ul>
      <NewToDoForm />
    </div>
  );
}

function ToDoItem({
  id,
  title,
  description,
  completed
}: {
  id: Id<"todos">;
  title: string;
  description: string;
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo)
  return (
    <li className="flex gap-2 items-center border rounded p-2 w-full">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateTodo({id, completed: e.target.checked})}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-auto">
        <button className="text-red-500" type="button" onClick={() => deleteTodo({id})}>
          Remove
        </button>
      </div>
    </li>
  );
}
