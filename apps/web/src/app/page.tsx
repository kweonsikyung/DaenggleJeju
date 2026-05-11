"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/api/useAuth";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) {
      router.replace("/map");
    } else {
      router.replace("/splash");
    }
  }, [isLoggedIn, isLoading, router]);

  return null;
}
