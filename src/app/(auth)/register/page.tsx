'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import IntlTelInput from 'intl-tel-input/react';
import 'intl-tel-input/build/css/intlTelInput.css';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phone_code: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.firstName) {
      setError("First name is required.");
      isValid = false;
    } else if (!formData.lastName) {
      setError("Last name is required.");
      isValid = false;
    } else if (!formData.phone) {
      setError("Phone number is required.");
      isValid = false;
    } else if (!formData.email) {
      setError("Email is required.");
      isValid = false;
    } else if (!formData.password) {
      setError("Password is required.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://sewaar.net/api/v1/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          phone_code: formData.phone_code,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
        toast.error(errorData.message || "Something went wrong");
      } else {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push('/login');
        }, 500);
      }
    } catch (error) {
      setError("Failed to create an account. Please try again later.");
      toast.error("Failed to create an account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (isValid: boolean, number: string, countryData: any) => {
    setFormData((prev) => ({
      ...prev,
      phone: number,
      phone_code: countryData.dialCode,
    }));
  };

  return (
    <>
      <Card className="mx-auto max-w-lg p-8 shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-sm text-gray-600">Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Max"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Robinson"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone_code">Phone Code</Label>
              <Input
                id="phone_code"
                type="number"
                placeholder="056"
                value={formData.phone_code}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="056666666"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create an account"}
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </>
  );
}
