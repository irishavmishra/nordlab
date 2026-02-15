"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { AuthLayout } from "./AuthLayout";
import { cn } from "@/lib/utils";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    organizationName: z.string().min(2, "Organization name is required"),
    acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        setError(result.error.message || "Failed to create account");
        return;
      }

      router.push("/app");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Register your dealership for the B2B portal">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-4 rounded-md bg-rust/10 border border-rust/30">
            <p className="text-sm text-copper-light">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm text-warm-gray">
            Full name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            autoComplete="name"
            className={cn(
              "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid",
              "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
              errors.name ? "border-rust" : "border-slate-dark"
            )}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="text-sm text-copper-light">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="organizationName" className="block text-sm text-warm-gray">
            Organization name
          </label>
          <input
            {...register("organizationName")}
            type="text"
            id="organizationName"
            className={cn(
              "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid",
              "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
              errors.organizationName ? "border-rust" : "border-slate-dark"
            )}
            placeholder="Acme Distributors Inc."
          />
          {errors.organizationName && (
            <p className="text-sm text-copper-light">{errors.organizationName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-warm-gray">
            Work email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            autoComplete="email"
            className={cn(
              "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid",
              "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
              errors.email ? "border-rust" : "border-slate-dark"
            )}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="text-sm text-copper-light">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm text-warm-gray">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              className={cn(
                "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid pr-12",
                "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
                errors.password ? "border-rust" : "border-slate-dark"
              )}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-mid hover:text-warm-gray transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-copper-light">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm text-warm-gray">
            Confirm password
          </label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              className={cn(
                "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid pr-12",
                "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
                errors.confirmPassword ? "border-rust" : "border-slate-dark"
              )}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-mid hover:text-warm-gray transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-copper-light">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("acceptTerms")}
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-slate-dark bg-charcoal text-copper focus:ring-copper focus:ring-offset-0"
            />
            <span className="text-sm text-warm-gray">
              I agree to the{" "}
              <Link href="/terms" className="text-copper hover:text-copper-light transition-colors">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-copper hover:text-copper-light transition-colors">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-sm text-copper-light">{errors.acceptTerms.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full py-3 px-4 rounded-md text-obsidian font-medium",
            "bg-gradient-to-r from-copper to-copper-dark",
            "hover:shadow-lg hover:shadow-copper/20 transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create account"
          )}
        </button>

        <p className="text-center text-sm text-warm-gray">
          Already have an account?{" "}
          <Link href="/login" className="text-copper hover:text-copper-light transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
