"use client";

import { useEffect, useState } from "react";

import { LoginModal } from "@/components/modals/login-modal";
import { ForgotPasswordModal } from "@/components/modals/forgot-password-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { LogoutModal } from "@/components/modals/logout-modal";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <LogoutModal />
      <RegisterModal />
      <ForgotPasswordModal />
    </>
  )
}