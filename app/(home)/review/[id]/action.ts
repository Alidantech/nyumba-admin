"use server";
import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Function to request a property
export async function listProperty(prevState: any, formData: any) {
  const propertyId = formData.get("propertyId");

  // Fetch the property details by property ID
  const property = await client
    .db(DATABASE_NAME)
    .collection("properties")
    .findOne({ _id: new ObjectId(propertyId) });

  if (!property) {
    return {
      success: false,
      message: "Property not found.",
    };
  }

  // Update the property status to listed
  await client
    .db(DATABASE_NAME)
    .collection("properties")
    .updateOne(
      { _id: new ObjectId(propertyId) },
      { $set: { status: "listed" } }
    );

  return {
    success: true,
    message: "Property listed successfully.",
  };
}
