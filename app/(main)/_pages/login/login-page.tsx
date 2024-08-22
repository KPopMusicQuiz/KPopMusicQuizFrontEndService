"use client";

import { Button } from "@/components/ui/button";
import { ModalType, useModal } from "@/hooks/use-modal-store";

const LoginPage = () => {
  const { onOpen } = useModal();
  return (
    <>
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Kpop Music Quiz</h1>
      </header>
      <main className="flex-1 w-full max-w-2xl mx-auto p-4">
        <div className="p-4">
          <h2 className="text-xl font-bold">Welcome to Kpop Music Quiz!!</h2>
          <p className="mt-2">
            Test your knowledge of Kpop by guessing the songs. Challenge your friends and see who knows more!
          </p>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => onOpen(ModalType.Login)}
            size="sm"
            variant="primary"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Log in
          </Button>
        </div>
      </main>
    </>
  );
};

export default LoginPage;