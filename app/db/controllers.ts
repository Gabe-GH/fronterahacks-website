"use server";

import clientPromise from "./mongodb";

import { generateQRCode } from "../util/GenerateQRCode";
import { hackerSchema } from "./schema/hacker";
import { ObjectId } from "mongodb";

export interface hackerFormData {
  firstName: string;
  lastName: string;
  age: string | number;
  phoneNumber: string;
  email: string;
  studyLevel: string;
  school: string;
  diet: string;
  teeSize: string;
  underrepresentedInTech: string;
  gender: string;
  major: string;
  orientation: string;
  pronouns: string;
  race: string;
}

interface hackerDatabaseType extends hackerFormData {
  qrcode: string;
}

export async function createHacker(hackerData: hackerFormData): Promise<void> {
  let exists = false;

  try {
    // make sure email is unique
    // if it is not return error
    // create qr code for hacker
    // make full hacker object for database
    // create hacker in database
    // return hacker

    const hacker: hackerFormData = hackerData;

    if (typeof hacker.age === "string") hacker.age = parseInt(hacker.age);

    hackerSchema.parse(hackerData);

    const client = await clientPromise;

    const db =
      process.env.NODE_ENV === "production"
        ? client.db("fronteraHacks24")
        : client.db("test_fronteraHacks24");

    const hackersCollection = db.collection("hackers");

    const userExists = await hackersCollection.findOne({ email: hacker.email });

    if (userExists) {
      exists = true;
      throw new Error("User already exists");
    }

    const qrcode = await generateQRCode(hacker.email);

    const hackerEntry: hackerDatabaseType = {
      ...hacker,
      qrcode,
    };

    await hackersCollection.insertOne(hackerEntry);
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else throw new Error("Please properly fill out all fields");
  }
}

export async function findHacker(email: string): Promise<boolean> {
  try {
    const client = await clientPromise;

    const db =
      process.env.NODE_ENV === "production"
        ? client.db("fronteraHacks24")
        : client.db("test_fronteraHacks24");

    const hackersCollection = db.collection("hackers");

    const userExists = await hackersCollection.findOne({ email });

    return userExists ? true : false;
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else {
      console.error(error);
      throw new Error("Database error");
    }
  }
}

export async function findHackerById(id: string): Promise<any> {
  try {
    const client = await clientPromise;

    const db =
      process.env.NODE_ENV === "production"
        ? client.db("fronteraHacks24")
        : client.db("test_fronteraHacks24");

    const hackersCollection = db.collection("hackers");

    // Convert string ID to ObjectId
    const objectId = new ObjectId(id);

    const userExists = await hackersCollection.findOne({ _id: objectId });

    const user = {
      ...userExists,
      _id: userExists?._id.toString(),
    };

    return userExists ? user : null;
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else {
      console.error(error);
      throw new Error("Database error");
    }
  }
}

export async function findHackerByEmail(email: string): Promise<any> {
  try {
    const client = await clientPromise;

    const db =
      process.env.NODE_ENV === "production"
        ? client.db("fronteraHacks24")
        : client.db("test_fronteraHacks24");

    const hackersCollection = db.collection("hackers");

    const user = await hackersCollection.findOne({ email });

    return user ? user : new Error("ow");
  } catch (e) {
    const error = e as Error;

    if (error.message === "User already exists") throw e;
    else {
      console.error(error);
      throw new Error("Database error");
    }
  }
}

export async function checkInHackerById(id: string): Promise<void> {
  try {
    const client = await clientPromise;

    const db =
      process.env.NODE_ENV === "production"
        ? client.db("fronteraHacks24")
        : client.db("test_fronteraHacks24");

    const hackersCollection = db.collection("hackers");

    // Convert string ID to ObjectId
    const objectId = new ObjectId(id);

    // Find the hacker and update their checked_in field to true
    const updateResult = await hackersCollection.updateOne(
      { _id: objectId },
      { $set: { checked_in: true } }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("Hacker not found");
    }

    console.log(`Hacker with ID ${id} checked in successfully.`);
  } catch (e) {
    const error = e as Error;
    console.error("Check-in failed:", error.message);
    throw new Error("Failed to check in hacker.");
  }
}
