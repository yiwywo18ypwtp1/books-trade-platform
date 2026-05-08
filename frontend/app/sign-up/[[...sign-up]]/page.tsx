import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
            <SignUp />;
        </div>
    )
}