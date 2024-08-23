"use server";
import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";
import { getCookie } from "@/lib/utils/cookies.util";

// method to update user details
export async function updateUserDetails(prevState: any, formData: any) {
  let newData: any = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  };

  await client.db(DATABASE_NAME).collection("admins").updateOne(
    {
      email: newData.email,
    },
    { $set: newData }
  );

  return {
    success: true,
    message: "User details updated successfully",
  };
}
