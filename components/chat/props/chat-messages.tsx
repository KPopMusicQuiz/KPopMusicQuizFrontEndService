"use client";

import { ElementRef, Fragment, useRef } from "react";
import { LuServerCrash } from "react-icons/lu";
import { TbLoader2 } from "react-icons/tb";

import { Message, Profile } from "@prisma/client";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

import { useChatScroll } from "@/hooks/chat/use-chat-scroll";


interface ChatMessagesProps {
  messagesQuery: UseInfiniteQueryResult,
}

export const ChatMessages = ({
  messagesQuery
}: ChatMessagesProps) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = messagesQuery;

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <TbLoader2 className="h-7 w-7 text-custom-slate-300 animate-spin my-4" />
        <p className="text-xs text-custom-slate-300">
          Loading messages...
        </p>
      </div>
    )
  };

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <LuServerCrash className="h-7 w-7 text-custom-slate-300 my-4" />
        <p className="text-xs text-custom-slate-300">
          Something went wrong!
        </p>
      </div>
    )
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-scroll overflow-x-hidden custom-scrollbar"
      ref={chatRef}
    >
      {!hasNextPage && <div className="flex-1" />}
      {hasNextPage && (
        <div className="flex justify-center">
          {
            isFetchingNextPage
              ? <TbLoader2 className="h-6 w-6 text-custom-slate-300 animeate-spin my-4" />
              : <button
                className="text-custom-slate-300 hover:text-custom-slate-400 text-xs my-4 transition"
                onClick={() => fetchNextPage()}
              >
                Load previous messages
              </button>
          }
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((batch, index) => (
          <Fragment key={index}>
            {batch.items.map((message: Message & { profile: Profile }, msg_index: number) => (
              <div
                key={message.id}
                className={`flex items-center space-x-2 py-1 pl-2 ${msg_index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700'}`}
              >
                <span className="text-xs text-gray-400 flex w-8">
                  {new Date(message.createdAt).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                <span className="font-semibold text-blue-500">{message.profile.name}</span>
                <span className="text-sm">{message.content}</span>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};