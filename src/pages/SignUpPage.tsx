import { Navbar } from "@/components/Navbar";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
        <SignUp routing="path" path="/sign-up" appearance={{ variables: { colorPrimary: "#16a34a" } }} />
      </div>
    </div>
  );
};

export default SignUpPage;


