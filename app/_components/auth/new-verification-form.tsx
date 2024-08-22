"use client";

import { useCallback, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { ErrorForm } from "@/app/_components/error-form";

//TODO: FIX THIS PAGE

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong...");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
      <div className="flex items-center w-full justify-center">
        {!success && !error && (<HashLoader color="#3bbf8f" />)}
        <ErrorForm message={error} />
      </div>
  )
}