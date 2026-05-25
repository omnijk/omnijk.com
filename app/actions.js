"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createMessage(formData) {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        ok: false,
        message: "Please sign in before leaving a message.",
      };
    }

    const message = String(formData.get("message") ?? "").trim();

    if (!message) {
      return {
        ok: false,
        message: "Please enter something.",
      };
    }

    await prisma.message.create({
      data: {
        message,
        userId: user.id,
        userName: user.username || user.firstName,
        userImg: user.imageUrl,
      },
    });

    revalidatePath("/message");

    return { ok: true };
  } catch (error) {
    console.error("Failed to create message:", error);
    return {
      ok: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
