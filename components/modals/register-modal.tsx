"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { register } from "@/actions/register";
import { Social } from "@/app/_components/auth/social";
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
import { SuccessForm } from "@/components/success-form";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { RegisterSchema } from "@/schemas";

export const RegisterModal = () => {
  const { type, isOpen, onOpen, onClose } = useModal();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === ModalType.Register;

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  const handleClose = () => {
    form.reset();
    setSuccess("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create an account
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {!!!success && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="flex space-x-1 uppercase
                          text-xs font-bold text-zinc-500
                          dark:text-secondary/70"
                      >
                        <div className="space-x-0 flex">
                          <p>Name</p>
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
                          disabled={isPending}
                          placeholder="name"
                          type="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="flex space-x-1 uppercase
                          text-xs font-bold text-zinc-500
                          dark:text-secondary/70"
                      >
                        <div className="space-x-0 flex">
                          <p>Password</p>
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
                          disabled={isPending}
                          placeholder="********"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-4">
                <Social />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <div className="w-full flex-col">
                  <Button variant="primary" type="submit" className="w-full" disabled={isPending}>
                    Continue
                  </Button>
                  <span className="text-xs px-0 text-primary underline-offset-4 flex items-center">
                    <p>Already have an account?</p>
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
        )}
        {!!success && <SuccessForm />}
      </DialogContent>
    </Dialog>
  );
};