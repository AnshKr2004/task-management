import { MongoClient, Db } from "mongodb";
import clientPromise from "./mongodb";

const DB_NAME = process.env.MONGODB_DB || "tasksDB"; // Ensure database name is set

let db: Db;

async function init() {
  if (db) return db;
  try {
    const client = await clientPromise;
    db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to establish connection to database");
  }
}

export async function getCollection(collectionName: string) {
  const db = await init();
  return db.collection(collectionName);
}