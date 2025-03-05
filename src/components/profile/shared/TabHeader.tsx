
import { ReactNode } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TabHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: ReactNode;
}

export const TabHeader = ({
  title,
  buttonText,
  onButtonClick,
  icon,
}: TabHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </CardTitle>
        {buttonText && onButtonClick && (
          <Button onClick={onButtonClick}>{buttonText}</Button>
        )}
      </div>
    </CardHeader>
  );
};
