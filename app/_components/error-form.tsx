import { cn } from "@/lib/utils";

interface ErrorFormProps {
  className?: string;
  message?: string;
}

export const ErrorForm = ({
  className,
  message,
}: ErrorFormProps) => {
  if (!message) return null;

  return (
    <p className={cn("text-[0.8rem] font-medium text-destructive", className)}>
      - {message}
    </p>
  );
};
