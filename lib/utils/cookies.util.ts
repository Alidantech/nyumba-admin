"use server";
import { cookies } from "next/headers";

export async function setCookieFromString(cookie: string): Promise<void> {
  console.log("Setting cookie from string:", cookie);
  const cookieParams = cookie
    .split(";")
    .map((param: any) => param.trim().split("="));

  console.log("cookieParams:", cookieParams);

  const cookieName = cookieParams[0][0];
  const cookieValue = cookieParams[0][1];

  cookies().set(cookieName, cookieValue, {});
}

export async function getCookie(name: string): Promise<string | null> {
  const cookie = cookies().get(name) as unknown as string;
  if (!cookie) {
    return null;
  }
  return cookie;
}
