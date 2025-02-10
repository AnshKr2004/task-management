"use client"

import { useState, useId } from "react"
import { createTask } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type { Task } from "@/models/Task"

interface TaskFormProps {
  onTaskCreated: (newTask: Task) => void
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const formId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createTask({
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      completed: false,
    })

    if (result.success && result.taskId) {
      const newTask: Task = {
        _id: result.taskId,
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
        completed: false,
      }
      onTaskCreated(newTask)
      setTitle("")
      setDescription("")
      setDueDate("")
      toast.success("Task created successfully")
    } else {
      toast.error(result.error || "Failed to create task")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        id={`${formId}-title`}
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        id={`${formId}-description`}
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        id={`${formId}-dueDate`}
      />
      <Button type="submit">Create Task</Button>
    </form>
  )
}