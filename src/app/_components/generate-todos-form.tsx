import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";

export function GenerateTodosForm() {
    const [userPrompt, setUserPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const generateTodos = useAction(api.actions.generateTodos);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const todos = await generateTodos({ prompt: userPrompt });
            console.log(todos);
            setUserPrompt("");
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setLoading(false);
        }
    }
    if(loading) {
        return <p>Generating todos...</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-lg">Generate Tasks with AI 🔮</h2>
                <label className="text-sm font-semibold" htmlFor="prompt">Prompt</label>
                <input 
                    className="p-1 border rounded" 
                    type="text" 
                    name="prompt" 
                    id="prompt" 
                    value={userPrompt} 
                    onChange={e => setUserPrompt(e.target.value)} 
                />
                <button className="bg-blue-500 p-1 rounded text-white font-semibold" type="submit">Create</button>
            </div>
        </form>
    );
}
