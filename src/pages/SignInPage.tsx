import { Navbar } from "@/components/Navbar";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>
        <SignIn routing="path" path="/sign-in" appearance={{ variables: { colorPrimary: "#16a34a" } }} />
      </div>
    </div>
  );
};

export default SignInPage;


