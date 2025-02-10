"use server"

import { getCollection } from "@/lib/db"
import type { Task } from "@/models/Task"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export async function getTasks(): Promise<{ tasks: Task[] | null; error: string | null }> {
  try {
    const collection = await getCollection("tasks");
    const tasks = await collection.find({}).toArray();
    
    if (!tasks) throw new Error("No tasks found");

    const serializedTasks = tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
      dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
    }));

    return { tasks: serializedTasks as Task[], error: null };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { tasks: null, error: "Failed to fetch tasks from database" };
  }
}

export async function createTask(
  task: Omit<Task, "_id">
): Promise<{ success: boolean; error: string | null; taskId?: string }> {
  try {
    const collection = await getCollection("tasks");
    const result = await collection.insertOne(task);
    return { success: true, error: null, taskId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create task" };
  }
}

export async function updateTask(task: Task): Promise<{ success: boolean; error: string | null }> {
  try {
    const collection = await getCollection("tasks")
    const { _id, ...updateData } = task
    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updateData })
    revalidatePath("/")
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: "Failed to update task" }
  }
}

export async function deleteTask(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const collection = await getCollection("tasks")
    await collection.deleteOne({ _id: new ObjectId(id) })
    revalidatePath("/")
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: "Failed to delete task" }
  }
}