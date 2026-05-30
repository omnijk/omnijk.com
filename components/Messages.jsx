import Image from "next/image";
import prisma from "@/lib/db";
import { formatDistanceToNow } from "date-fns";

export default async function Messages() {
  const messages = await getMessages();
  const staticMessage = {
    id: "static-welcome-2026-05-22",
    userName: "omnijk",
    userImg: "/images/avatar.png",
    message: "Hello, welcome to omnijk's blog!",
    createdAt: "2026-05-22T00:00:00.000Z",
  };
  const mergedMessages = [staticMessage, ...messages];

  if (!mergedMessages.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No messages available right now.
      </p>
    );
  }

  return (
    <ul className="flex flex-col space-y-2">
      {mergedMessages.map((message, index) => (
        <li key={message.id}>
          <div className="flex items-start gap-3 my-1">
            <div className="flex flex-col items-center flex-shrink-0 gap-2">
              <Image
                src={message.userImg}
                width={40}
                height={40}
                alt="user profile image"
                unoptimized
                className="mb-1 rounded-full"
              />
              {index != mergedMessages.length - 1 && (
                <div className="w-1 h-3 border-l-2 border-foreground"></div>
              )}
            </div>

            <div className="flex flex-col w-full ">
              <div className="flex items-center gap-2">
                <p>{message.userName}</p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p className="mt-1 text-xs font-light break-words">
                {message.message}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

async function getMessages() {
  try {
    return await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}
