"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
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
import Link from "next/link";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formData, setFormData] = useState({ phone: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});
        setAlert(null);

        // Validate input
        const parsed = loginSchema.safeParse(formData);
        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            parsed.error.issues.forEach((issue) => {
                const key = String(issue.path[0]);
                fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            setAlert({ type: "error", message: "Please fix the errors below." });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });

            if (!res.ok) {
                const error = await res.json();
                setAlert({ type: "error", message: error.message || "Login failed" });
            } else {
                setAlert({ type: "success", message: "Logged in successfully!" });
                // Redirect to dashboard or home page after successful login
                router.push("/");
            }
        } catch {
            setAlert({ type: "error", message: "Something went wrong. Try again." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your phone number and password to login.</CardDescription>
                </CardHeader>
                <CardContent>
                    {alert && (
                        <Alert
                            variant={alert.type === "error" ? "destructive" : "default"}
                            className="mb-4"
                        >
                            <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} noValidate>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-1">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="xxxxxxxxxx"
                                    required
                                    value={formData.phone}
                                    onChange={onChange}
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="text-red-600 text-sm mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-1">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={onChange}
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                />
                                {errors.password && (
                                    <p id="password-error" className="text-red-600 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Logging in..." : "Log In"}
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="max-w-sm w-sm px-4">
                <LoginForm />
            </div>
        </div>
    );
}
