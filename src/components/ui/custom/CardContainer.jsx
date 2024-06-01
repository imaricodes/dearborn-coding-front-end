import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const CardContainer = ({ children, className = "", ...props }) => {
  return (
    <Card
      className={cn("h-96 w-full max-w-4xl mx-auto", className)}
      {...props}
    >
      {children}
    </Card>
  );
};


