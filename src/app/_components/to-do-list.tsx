import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export function ToDoList() {
  const todos = useQuery(api.functions.listTodos);

  if (!todos || todos.length === 0) {
    return <p className="text-gray-600 text-center">Nothing to see here! 🌟 Create new tasks to get things rolling.</p>;
  }

  return (
    <ul className="space-y-4">
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
  const deleteTodo = useMutation(api.functions.deleteTodo);

  return (
    <li className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer">
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => updateTodo({ id, completed: e.target.checked })}
        className="h-5 w-5 text-blue-600"
      />
      <div className="flex-1">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <button
        className="text-red-500 font-semibold transition-colors hover:text-red-700"
        type="button"
        onClick={() => deleteTodo({ id })}
      >
        Remove
      </button>
    </li>
  );
}