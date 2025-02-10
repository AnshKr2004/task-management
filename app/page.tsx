"use client"

import { useState } from "react"
import TaskList from "@/components/TaskList"
import TaskForm from "@/components/TaskForm"
import type { Task } from "@/models/Task"

export default function Home() {
  const [newTask, setNewTask] = useState<Task | null>(null)

  const handleTaskCreated = (task: Task) => {
    setNewTask(task)
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList initialTasks={[]} newTask={newTask} />
    </main>
  )
}