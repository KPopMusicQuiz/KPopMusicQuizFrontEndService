"use client";

import { signOut } from "next-auth/react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { ModalType, useModal } from "@/hooks/use-modal-store";


export const LogoutModal = () => {
    const { type, isOpen, onClose } = useModal();

    const [isPending, startTransition] = useTransition();

    const isModalOpen = isOpen && type === ModalType.Logout;

    const onClick = () => {
        startTransition(() => {
            signOut()
                .then(() => {
                    location.reload();
                    onClose();
                });
        });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Log out
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-end w-full space-x-2">
                        <Button disabled={isPending} onClick={onClose} variant="outline">
                            Cancel
                        </Button>
                        <Button disabled={isPending} onClick={onClick} variant="destructive">
                            Log out
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

