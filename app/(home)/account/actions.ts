"use server";
import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";
import { getCookie } from "@/lib/utils/cookies.util";

export async function getCurrentUser() {
  const user = await client
    .db(DATABASE_NAME)
    .collection("users")
    .findOne(
      { walletAddress: "" },
      {
        projection: {
          _id: 0,
          walletAddress: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          avatar: 1,
        },
      }
    );
  return user;
}

// method to update user details
export async function updateUserDetails(prevState: any, formData: any) {
  let newData: any = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  };

  // await client
  //   .db(DATABASE_NAME)
  //   .collection("users")
  //   .updateOne({ walletAddress: userAddress.value }, { $set: newData });

  return {
    success: true,
    message: "User details updated successfully",
  };
}

// function for user to add a new property
export async function addProperty(formData: any) {
  const propertyData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    location: formData.get("location"),
    image: formData.get("image"),
  };

  // insert property data
  await client
    .db(DATABASE_NAME)
    .collection("properties")
    .insertOne(propertyData);

  return {
    success: true,
    message: "Property added successfully",
  };
}
