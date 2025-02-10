"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/models/Task"
import TaskItem from "./TaskItem"
import { getTasks } from "@/app/actions"
import { toast } from "sonner"

interface TaskListProps {
  initialTasks: Task[]
  newTask: Task | null
}

export default function TaskList({ initialTasks, newTask }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      const { tasks: fetchedTasks, error } = await getTasks()
      setLoading(false)
      if (error) {
        toast.error(error)
      } else if (fetchedTasks) {
        setTasks(fetchedTasks)
      }
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    if (newTask) {
      setTasks((prevTasks) => [newTask, ...prevTasks])
    }
  }, [newTask])

  const updateTaskInList = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)))
  }

  const removeTaskFromList = (taskId: string) => {
    setTasks(tasks.filter((task) => task._id !== taskId))
  }

  if (loading) {
    return <p>Loading tasks...</p>
  }

  if (tasks.length === 0) {
    return <p>No tasks found</p>
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={updateTaskInList} onDelete={removeTaskFromList} />
      ))}
    </ul>
  )
}