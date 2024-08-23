"use server";
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "@/lib/mongodb";
import { DATABASE_NAME, JWT_SECRET } from "@/lib/config";
import { getCookie, setCookieFromString } from "@/lib/utils/cookies.util";

const ADMIN_USERS = [
  {
    email: "admin@nyumba.com",
    password: "admin",
    role: "super_admin",
    firstName: "Admin",
    lastName: "User",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    email: "government@nyumba.com",
    password: "government",
    role: "government",
    firstName: "Government",
    lastName: "User",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    email: "official@nyumba.com",
    password: "official",
    role: "official",
    firstName: "Official",
    lastName: "User",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

async function initializeAdmins() {
  const db = client.db(DATABASE_NAME);
  const adminCount = await db.collection("admins").countDocuments();

  if (adminCount === 0) {
    const admins = await Promise.all(
      ADMIN_USERS.map(async (admin) => ({
        email: admin.email,
        password: await hash(admin.password, 10),
        role: admin.role,
        firstName: admin.firstName,
        lastName: admin.lastName,
        avatar: admin.avatar,
      }))
    );
    await db.collection("admins").insertMany(admins);
    console.log("Admin users initialized.");
  }
}

export async function LoginAction(prevState: any, formData: any) {
  await initializeAdmins();

  const email = formData.get("email");
  const password = formData.get("password");

  const db = client.db(DATABASE_NAME);

  const admin = await db.collection("admins").findOne({ email });

  if (!admin) {
    return { success: false, message: "Invalid email or password" };
  }

  const isPasswordCorrect = await compare(password, admin.password);
  if (!isPasswordCorrect) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = jwt.sign({ email: admin.email, role: admin.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // Set the JWT token as a cookie
  const cookieString = `auth-token=${token}; HttpOnly; Secure; Path=/; Max-Age=3600`;
  await setCookieFromString(cookieString);

  return { success: true, message: "Login successful" };
}

// function to get currnt loggged in admin from the cookie
export async function getLoggedInAdmin() {
  // Retrieve the JWT token from the cookie
  const authToken: any = await getCookie("auth-token");

  if (!authToken) {
    return { success: false, message: "No auth token found" };
  }

  // Verify and decode the JWT token
  const decodedToken = jwt.verify(authToken.value, JWT_SECRET) as {
    email: string;
    role: string;
  };

  const db = client.db(DATABASE_NAME);

  // Fetch the admin user details from the database
  const admin = await db
    .collection("admins")
    .findOne({ email: decodedToken.email });

  if (!admin) {
    return { success: false, message: "Admin not found" };
  }

  return admin;
}
