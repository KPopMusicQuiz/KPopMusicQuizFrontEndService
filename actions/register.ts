"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  };

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10); // re=look hashing mechanism later salt***

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { error: "Email already in use!" };
  };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )

  return { success: "An email has been sent to xxx with a verification code" };
};