import { TwoFactorForm } from "@/components/auth/TwoFactorForm";

const TwoFactorAuth = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TwoFactorForm />
      </div>
    </div>
  );
};

export default TwoFactorAuth;
