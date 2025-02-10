"use client"

import { useState, useId } from "react"
import type { Task } from "@/models/Task"
import { updateTask, deleteTask } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface TaskItemProps {
  task: Task
  onUpdate: (task: Task) => void
  onDelete: (taskId: string) => void
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const [isUpdating, setIsUpdating] = useState(false)
  const itemId = useId()

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      const result = await updateTask(editedTask)
      if (result.success) {
        onUpdate(editedTask)
        setIsEditing(false)
        toast.success("Task updated successfully")
      } else {
        throw new Error(result.error || "Failed to update task")
      }
    } catch (error) {
      console.error("Error updating task:", error)
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    const result = await deleteTask(task._id)
    if (result.success) {
      onDelete(task._id)
      toast.success("Task deleted successfully")
    } else {
      toast.error(result.error || "Failed to delete task")
    }
  }

  const handleToggleComplete = async () => {
    const updatedTask = { ...task, completed: !task.completed }
    try {
      const result = await updateTask(updatedTask)
      if (result.success) {
        onUpdate(updatedTask)
        toast.success(`Task marked as ${updatedTask.completed ? "completed" : "incomplete"}`)
      } else {
        throw new Error(result.error || "Failed to update task status")
      }
    } catch (error) {
      console.error("Error toggling task completion:", error)
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  if (isEditing) {
    return (
      <li className="bg-white shadow rounded-lg p-4 space-y-4">
        <Input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          id={`${itemId}-title`}
        />
        <Textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          id={`${itemId}-description`}
        />
        <Input
          type="date"
          value={editedTask.dueDate.split("T")[0]}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: new Date(e.target.value).toISOString() })}
          id={`${itemId}-dueDate`}
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isUpdating}>
            Cancel
          </Button>
        </div>
      </li>
    )
  }

  return (
    <li className="bg-white shadow rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
        <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} />
      </div>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  )
}