import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const twoFactorSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

type TwoFactorFormData = z.infer<typeof twoFactorSchema>;
// Also, I wanna add

// const verify2FA = async (data: TwoFactorFormData) => {
//   const response = await api.post("/auth/verify-2fa", data);
//   return response.data;
// };

const verify2FA = async (data: TwoFactorFormData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.code === "131311") {
        resolve({ message: "2FA verified successfully" });
      } else {
        reject({ response: { data: { message: "Invalid code" } } });
      }
    }, 1000);
  });
};
const requestNewCode = async () => {
  const response = await api.post("/auth/request-2fa-code");
  return response.data;
};

export const TwoFactorForm = () => {
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(0);
  const [isCodeRequested, setIsCodeRequested] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const code = watch("code");

  useEffect(() => {
    setCountdown(60);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const verifyMutation = useMutation({
    mutationFn: verify2FA,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Two-factor authentication verified successfully.",
      });
      console.log("2FA verification successful:", data);
    },
    onError: (error: any) => {
      setError("code", {
        type: "manual",
        message: "Invalid code",
      });
      toast({
        title: "Verification Failed",
        description:
          error.response?.data?.message || "Invalid authentication code.",
        variant: "destructive",
      });
    },
  });

  const requestNewCodeMutation = useMutation({
    mutationFn: requestNewCode,
    onSuccess: () => {
      setCountdown(60);
      setIsCodeRequested(true);
      setValue("code", "");
      clearErrors("code");
      toast({
        title: "New Code Sent",
        description: "A new authentication code has been sent to your device.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Request Failed",
        description:
          error.response?.data?.message || "Failed to request new code.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TwoFactorFormData) => {
    verifyMutation.mutate(data);
  };

  const handleGetNewCode = () => {
    requestNewCodeMutation.mutate();
  };

  const handleBack = () => {};

  const handleCodeChange = (value: string) => {
    setValue("code", value);
    if (errors.code) {
      clearErrors("code");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-card">
      <CardHeader className="text-center space-y-4 pb-8">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-primary-foreground rounded-full"></div>
          </div>
          <div className="w-8 h-8"></div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-medium text-foreground">
            Company
          </CardTitle>
          <CardDescription className="text-lg font-normal text-foreground leading-relaxed">
            Two-Factor Authentication
          </CardDescription>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from the Google Authenticator app
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={handleCodeChange}
                className="gap-2"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                  <InputOTPSlot
                    index={1}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                  <InputOTPSlot
                    index={2}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                  <InputOTPSlot
                    index={3}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                  <InputOTPSlot
                    index={4}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                  <InputOTPSlot
                    index={5}
                    className={`w-12 h-12 text-lg border-2 ${
                      errors.code ? "border-destructive" : "border-input"
                    }`}
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {errors.code && (
              <p className="text-sm text-destructive text-center">
                {errors.code.message}
              </p>
            )}
          </div>
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Get a new code in {formatCountdown(countdown)}
              </p>
            ) : (
              <Button
                type="button"
                variant="default"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal"
                onClick={handleGetNewCode}
                disabled={requestNewCodeMutation.isPending}
              >
                {requestNewCodeMutation.isPending ? "Requesting..." : "Get new"}
              </Button>
            )}
          </div>
          {countdown > 0 && (
            <Button
              type="submit"
              disabled={verifyMutation.isPending || code.length !== 6}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal disabled:opacity-50"
            >
              {verifyMutation.isPending ? "Verifying..." : "Continue"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};
