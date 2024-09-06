"use client"

import { SignInButton, UserButton } from "@clerk/nextjs";
import { NewToDoForm } from "./_components/new-todo-form";
import { ToDoList } from "./_components/to-do-list";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { GenerateTodosForm } from "./_components/generate-todos-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      
      <Authenticated>
        <div className="max-w-screen-md mx-auto py-10 space-y-6">
          
          <div className="flex items-center justify-between bg-white shadow-lg p-6 rounded-lg text-gray-800">
            <h1 className="text-3xl font-bold">Task Genie AI</h1>
            <UserButton />
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
            <ToDoList />
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Generate AI Tasks</h2>
            <GenerateTodosForm />
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Create a New Task</h2>
            <NewToDoForm />
          </div>
        </div>
      </Authenticated>

      <Unauthenticated>
        <div className="h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Task Genie AI</h1>
          <p className="text-2xl mb-8">
            The smartest way to manage your to-do list. Create tasks manually or let AI do it for you!
          </p>
          <SignInButton>
            <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-shadow shadow-lg hover:shadow-xl">
              Sign In to Get Started
            </button>
          </SignInButton>
        </div>
      </Unauthenticated>

      <AuthLoading>
        <div className="h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white border-dotted rounded-full animate-spin"></div>
        </div>
      </AuthLoading>
    </div>
  );
}