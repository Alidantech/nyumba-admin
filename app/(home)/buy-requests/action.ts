"use server";
import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";
import { getCookie } from "@/lib/utils/cookies.util";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// Function to remove a request
export async function acceptRequest(prevState: any, formData: any) {
  const requestId = formData.get("requestId");

  // Check if the request exists and if the user is the owner of the request
  const request = await client
    .db(DATABASE_NAME)
    .collection("requests")
    .findOne({ _id: new ObjectId(requestId) });

  if (!request) {
    return {
      success: false,
      message: "Request not found.",
    };
  }

  // Update the request status to accepted
  await client
    .db(DATABASE_NAME)
    .collection("requests")
    .updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: "accepted" } }
    );

  revalidatePath("/buy-requests");

  return {
    success: true,
    message: "Request Accepted successfully.",
  };
}
