import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function AdminSignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

 const onSubmit = async (data) => {
  try {
    const response = await axios.post(
     "http://localhost:4000/api/v1/admin/signUp",
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(response.data.message)
    navigate("/admin/login")
  } catch (error) {
    setError(error.response.data.message)
    console.error(error.response);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign up to get started
          </p>
           <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="space-y-1">
            <Label htmlFor="FullName">Full Name</Label>
            <Input
              id="FullName"
              placeholder="John Doe"
              {...register("FullName", {
                required: "FullName is required",
                minLength: {
                  value: 3,
                  errors: "Minimum 3 characters",
                },
              })}
            />
            {errors.FullName && (
              <p className="text-sm text-red-500">
                {errors.FullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  errors: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  errors: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/admin/login" className="cursor-pointer text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminSignUp;
