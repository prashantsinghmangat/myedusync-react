
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { API_ENDPOINTS } from '@/config/api';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        // const response = await fetch('https://api.myedusync.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer',
        },
        body: JSON.stringify({
          emailId: email,
          password: password
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage("Invalid email or password.");
        } else {
          const data = await response.json();
          setErrorMessage(data.data);
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      console.log("data from login: ", data);
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token and user data including role
      localStorage.setItem("user", JSON.stringify({
        email,
        userId: data?.data?.userId,
        role: data?.data?.role,
        isLoggedIn: true,
        token: data?.data?.accessToken
      }));

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      navigate("/profile");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              <div className="error-message text-red-500 text-sm">{errorMessage}</div>
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
