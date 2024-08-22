"use client";

import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Channel, Conversation } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatType, useChat } from "@/hooks/chat/use-chat-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export const ChatInput = () => {
  const { activeChat, chatInputPostUrl, chatType } = useChat();
  const user = useCurrentUser();

  const formSchema = z.object({
    content: z.string().min(1).max(256),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ""
    }
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: chatInputPostUrl as string,
        query: {
          chatId: activeChat?.id,
          userId: user?.id,
        },
      });

      await axios.post(url, value);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending || !activeChat}
                  type="text"
                  autoComplete="off"
                  className="py-6 border-none border-0 \
                             focus-visible:ring-0 focus-visible:ring-offset-0
                             text-zinc-600 dark:text-zinc-200"
                  placeholder={cn(
                    "Type message to ",
                    chatType === ChatType.Channel
                    ? "#" + (activeChat as Channel)?.name
                    : "@" + (activeChat as Conversation)?.profileTwoName // fix this naming
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
