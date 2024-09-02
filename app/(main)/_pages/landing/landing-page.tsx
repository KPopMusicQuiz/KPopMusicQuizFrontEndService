"use client";

import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  const { onOpen } = useModal();
  const phrases = ["Test your knowledge", "Challenge your friends"];


  return (
    <div className="flex flex-col justify-center items-center px-4">
      <header className="text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Kpop Music Quiz</h1>
      </header>
      <main className="flex-1 w-full mx-auto p-4">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          <FlipWords phrases={phrases} /> <br />
          on the real-time multiplayer KPop quiz game
        </div>
        <div>
          <Button
            type="button"
            onClick={() => onOpen(ModalType.Login)}
            size="sm"
            variant="primary"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Play Now!
          </Button>
        </div>
      </main>
    </div>
  );
};


export const FlipWords = ({
  phrases,
  duration = 4000,
  className,
}: {
  phrases: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const word = phrases[phrases.indexOf(currentPhrase) + 1] || phrases[0];
    setCurrentPhrase(word);
    setIsAnimating(true);
  }, [currentPhrase, phrases]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100",
          className
        )}
        key={currentPhrase}
      >
        {currentPhrase.split("").map((letter, letterIndex) => (
          <motion.span
            key={letterIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: letterIndex * 0.1,
              duration: 0.1,
            }}
            className="inline-block whitespace-nowrap"
          >
            {letter === " " ? <span className="inline-block">&nbsp;</span> : letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;
