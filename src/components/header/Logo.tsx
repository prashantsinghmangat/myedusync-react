
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/2557202f-2fb8-4411-aded-c15cc766021d.png" 
        alt="MyEduSync Logo" 
        className="h-8"
      />
    </Link>
  );
};
