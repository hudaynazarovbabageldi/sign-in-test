import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const loginUser = async (data: LoginFormData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const LoginForm = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      console.log("Login successful:", data);
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description:
          error.response?.data?.message || "An error occurred during login.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-primary-foreground rounded-full"></div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-medium text-foreground">
            Company
          </CardTitle>
          <CardDescription className="text-lg font-normal text-foreground leading-relaxed">
            Sign in to your account to continue
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full h-12 bg-muted hover:bg-muted/80 text-muted-foreground font-normal"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
