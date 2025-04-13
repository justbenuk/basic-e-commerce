"use server";

import { signInFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/lib/auth";

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
    return { success: false, message: `Invalid email or password, ${error}` };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}
