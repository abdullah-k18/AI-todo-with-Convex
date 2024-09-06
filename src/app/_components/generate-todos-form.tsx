import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export function GenerateTodosForm() {
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTodos = useAction(api.actions.generateTodos);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const todos = await generateTodos({ prompt: userPrompt });
      console.log(todos);
      setUserPrompt("");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generate Tasks with AI 🔮</h2>
      {loading ? (
        <p className="text-gray-600">Generating todos...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="prompt" className="text-sm font-semibold text-gray-700">Prompt</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="prompt"
            id="prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Enter a prompt to generate tasks"
          />
          <button
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold transition-colors hover:bg-blue-700"
            type="submit"
          >
            Generate
          </button>
        </form>
      )}
    </div>
  );
}