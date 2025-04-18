"use server";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { db } from "../../prisma/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { formatError } from "@/lib/utils";

//sign in user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: `Invalid email or password` };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

//sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    //parse the for data
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const hashedPassword = hashSync(user.password, 10);

    await db.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.password,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatError(error) };
  }
}
