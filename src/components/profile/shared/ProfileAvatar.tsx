
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  editable?: boolean;
  onEditClick?: () => void;
}

export const ProfileAvatar = ({
  src,
  alt = "User",
  fallback = "U",
  size = "md",
  editable = false,
  onEditClick,
}: ProfileAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-gray-300 shadow-md`}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback[0]}</AvatarFallback>
      </Avatar>
      {editable && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-0 right-0 rounded-full bg-white shadow hover:bg-gray-100"
          onClick={onEditClick}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
