"use server";

import clientPromise from "./mongodb";

import { generateQRCode } from "../util/GenerateQRCode";
import { hackerSchema } from "./schema/hacker";

interface hackerFormData {
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

    const qrcode = await generateQRCode(hacker.email);

    const hackerEntry: hackerDatabaseType = {
      ...hacker,
      qrcode,
    };

    await hackersCollection.insertOne(hackerEntry);
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create hacker");
  }
}
