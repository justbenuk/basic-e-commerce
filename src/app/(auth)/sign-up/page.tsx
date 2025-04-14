import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CredentialsSignUpForm from "@/forms/auth/credentials-signup";

export const metadata: Metadata = {
  title: "Sign Up | Basic ECommerce",
};

export default async function SignUpPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
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
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
