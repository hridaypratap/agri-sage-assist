import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
        {hasClerk ? (
          <SignUp
            routing="path"
            path="/sign-up"
            appearance={{ variables: { colorPrimary: "#16a34a" } }}
          />
        ) : (
          <p className="text-muted-foreground">
            Authentication is not configured.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
