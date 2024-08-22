"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { reset } from "@/actions/reset";
import { ErrorForm } from "@/app/_components/error-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { ResetSchema } from "@/schemas";


export const ForgotPasswordModal = () => {
  const { type, isOpen, onOpen, onClose } = useModal();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === ModalType.ForgotPassword;

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Forgot your password?
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            We can send you an email to reset your password
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6 px-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="flex space-x-1 uppercase
                                                text-xs font-bold text-zinc-500
                                                dark:text-secondary/70"
                    >
                      <div className="space-x-0 flex">
                        <p>Email</p>
                        <p className="text-destructive">*</p>
                      </div>
                      {
                        <ErrorForm className="normal-case" message={error} />
                        ?? <FormMessage className="normal-case" />
                      }
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <div className="w-full flex-col">
                <Button variant="primary" type="submit" className="w-full" disabled={isPending}>
                  Send
                </Button>
                <span className="text-xs px-0 text-primary underline-offset-4 flex items-center">
                  <p>Back to</p>
                  <Button
                    type="button"
                    onClick={() => onOpen(ModalType.Login)}
                    size="sm" variant="link"
                    className="px-0.5 text-xs text-cyan-500"
                  >
                    Log in
                  </Button>
                </span>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};