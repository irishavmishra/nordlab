"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { AuthLayout } from "./AuthLayout";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError(result.error.message || "Failed to sign in");
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
    <AuthLayout title="Welcome back" subtitle="Sign in to your dealer portal account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 rounded-md bg-rust/10 border border-rust/30">
            <p className="text-sm text-copper-light">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm text-warm-gray">
            Email address
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
              autoComplete="current-password"
              className={cn(
                "w-full px-4 py-3 bg-charcoal border rounded-md text-cream placeholder:text-slate-mid pr-12",
                "focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper",
                errors.password ? "border-rust" : "border-slate-dark"
              )}
              placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="w-4 h-4 rounded border-slate-dark bg-charcoal text-copper focus:ring-copper focus:ring-offset-0"
            />
            <span className="text-sm text-warm-gray">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-copper hover:text-copper-light transition-colors"
          >
            Forgot password?
          </Link>
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
              Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-center text-sm text-warm-gray">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-copper hover:text-copper-light transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
