import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function NewToDoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = useMutation(api.functions.createTodo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New To-Do</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <input
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
          />
        </div>
        <button
          className="bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors hover:bg-blue-700 w-full"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}