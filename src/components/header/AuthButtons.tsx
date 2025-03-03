
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const AuthButtons = () => {
  return (
    <div className="flex items-center space-x-2 pr-4">
      <Link to="/login">
        <Button variant="outline" size="sm" className="text-sm">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm" className="bg-accent hover:bg-accent-hover text-sm">
          Register
        </Button>
      </Link>
    </div>
  );
};
