import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { AlertProvider } from "@/providers/AlertProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Books Trade",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <AlertProvider>
                <html
                    lang="en"
                    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
                >
                    <body>
                        {children}
                    </body>
                </html>
            </AlertProvider>
        </ClerkProvider>
    );
}