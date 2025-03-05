
import { Label } from "@/components/ui";

interface ProfileInfoItemProps {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}

export const ProfileInfoItem = ({
  label,
  value,
  className = "",
}: ProfileInfoItemProps) => {
  return (
    <div className={className}>
      <Label className="font-semibold text-sm text-gray-500">{label}</Label>
      <p className="bg-gray-100 p-2 rounded-md mt-1 text-gray-800">
        {value || "Not specified"}
      </p>
    </div>
  );
};
