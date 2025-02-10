import type { Db, MongoClient } from "mongodb"
import clientPromise from "./mongodb"

let client: MongoClient
let db: Db

async function init() {
  if (db) return db
  try {
    client = await clientPromise
    db = client.db()
    return db
  } catch (error) {
    throw new Error("Failed to establish connection to database")
  }
}

export async function getCollection(collectionName: string) {
  const db = await init()
  return db.collection(collectionName)
}