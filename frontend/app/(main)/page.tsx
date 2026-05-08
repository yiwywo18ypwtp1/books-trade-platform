"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function Home() {
	const router = useRouter();

	const { user, isLoaded } = useUser();

	useEffect(() => {
		if (!isLoaded) return;

		if (!user) {
			router.replace("/sign-in");
			return;
		}

		router.replace("/books");
	}, [user, isLoaded, router]);

	return null;
}