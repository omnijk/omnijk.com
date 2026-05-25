import MessageForm from "@/components/MessageForm";

import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";
import {
  GuestBookFormLoading,
  LoadingMessages,
} from "@/components/LoadingState";
import Messages from "@/components/Messages";
import MessageDescription from "@/components/MessageDescription";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function MessagePage() {
  let user = null;

  try {
    user = await currentUser();
  } catch (error) {
    console.error("Failed to load Clerk user:", error);
  }

  return (
    <div className="flex flex-col w-full gap-20 lg:w-2/3">
      <MessageDescription />

      <Suspense fallback={<GuestBookFormLoading />}>
        {user ? (
          <MessageForm>
            <Image
              src={user.imageUrl}
              width={40}
              height={40}
              alt="user profile image"
              className="rounded-full "
            />
          </MessageForm>
        ) : (
          <div className="flex items-center justify-start h-20 px-10 pr-2 text-sm rounded-lg bg-secondary text-muted-foreground">
            🔒 Please log in to leave a message
          </div>
        )}
      </Suspense>

      <Suspense fallback={<LoadingMessages />}>
        <Messages />
      </Suspense>
    </div>
  );
}
