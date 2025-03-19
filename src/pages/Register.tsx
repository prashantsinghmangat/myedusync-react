
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_ENDPOINTS } from '@/config/api';
import { apiPost } from "@/utils/apiInterceptor";
import { SEO } from "@/components/SEO";
import { generateStructuredData } from "@/utils/seo";
import { PhoneInput } from "@/components/ui/phone-input";
import { countries } from "@/utils/countryData";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { AlertCircle } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    country: "India",
    countryCode: "IN",
    password: "",
    confirmPassword: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpResendCountdown, setOtpResendCountdown] = useState(0);
  const navigate = useNavigate();

  // Structured data for SEO
  const registerStructuredData = generateStructuredData('WebPage', {
    name: "Register - MyEduSync",
    description: "Create your MyEduSync account and join our education platform.",
    url: "https://myedusync.com/register",
    mainEntity: {
      "@type": "WebForm",
      name: "Registration Form",
      description: "Form to create a new account on MyEduSync"
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setFormData(prev => ({
        ...prev,
        country: country.name,
        countryCode: country.code
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    // Simple validation
    if (!formData.role || !formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation (at least 8 characters, one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, and numbers");
      return;
    }

    setIsLoading(true);

    try {
      await apiPost(API_ENDPOINTS.auth.register, {
        role: formData.role,
        emailId: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        name: formData.name,
        country: formData.country
      });

      toast.success("OTP has been sent to your email");
      setShowOtp(true);
      startResendCountdown();
    } catch (error) {
      // Error is already handled by the interceptor
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiPost(API_ENDPOINTS.auth.verifyOtp, {
        emailId: formData.email,
        otp: otp
      });

      const data = await response.json();

      if (!response.ok) {
        setOtpError("Invalid OTP. Please try again.");
        return;
      }

      // Store user data after successful verification
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        isLoggedIn: true,
        token: data.token
      }));

      toast.success("Registration successful! You are now logged in.");
      navigate("/profile");
    } catch (error: any) {
      setOtpError(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const startResendCountdown = () => {
    setOtpResendCountdown(60);
  };

  const handleResendOtp = async () => {
    if (otpResendCountdown > 0) return;
    
    setIsLoading(true);
    try {
      await apiPost(API_ENDPOINTS.auth.register, {
        emailId: formData.email,
        resendOtp: true
      });
      
      toast.success("New OTP has been sent to your email");
      startResendCountdown();
    } catch (error) {
      // Error is already handled by the interceptor
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpResendCountdown > 0) {
      timer = setInterval(() => {
        setOtpResendCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpResendCountdown]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Register | MyEduSync" 
        description="Create your account on MyEduSync - The leading educational platform connecting students with tutors"
        structuredData={registerStructuredData}
      />
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">Sign Up</h1>
            <p className="text-center text-gray-600 mb-8">
              Create a new MyEduSync account below.
            </p>
            {!showOtp ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Role (required)</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                    required
                  >
                    <SelectTrigger id="role" className="w-full" disabled={isLoading}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    defaultCountry={formData.countryCode}
                    onCountryChange={handleCountryChange}
                    placeholder="Enter your phone number"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => {
                      handleSelectChange("country", value);
                      const country = countries.find(c => c.name === value);
                      if (country) {
                        handleSelectChange("countryCode", country.code);
                      }
                    }}
                    required
                  >
                    <SelectTrigger id="country" className="w-full" disabled={isLoading}>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters and include uppercase, lowercase, and numbers
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex justify-center py-2">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {otpError && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {otpError}
                    </div>
                  )}
                  <p className="text-sm text-center text-gray-500 mt-2">
                    We've sent a 6-digit OTP to your email {formData.email}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    className={`text-sm ${
                      otpResendCountdown > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-accent hover:underline"
                    }`}
                    onClick={handleResendOtp}
                    disabled={otpResendCountdown > 0 || isLoading}
                  >
                    {otpResendCountdown > 0
                      ? `Resend OTP in ${otpResendCountdown}s`
                      : "Didn't receive the OTP? Resend"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
