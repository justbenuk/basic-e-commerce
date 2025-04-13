import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CredentialsSigninForm from "@/forms/auth/credentials-signin";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href={"/"} className="flex-center">
            <Image
              src={"/images/logo.svg"}
              width={100}
              height={100}
              alt="Site Logo"
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSigninForm />
        </CardContent>
      </Card>
    </div>
  );
}
