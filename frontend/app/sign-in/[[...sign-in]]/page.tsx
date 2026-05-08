import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-6 min-h-screen">
            <SignIn />;
        </div>
    )
}