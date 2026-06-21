"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/api/useAuth";

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { isLoggedIn, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) {
      router.replace(`/${locale}/map`);
    } else {
      router.replace(`/${locale}/splash`);
    }
  }, [isLoggedIn, isLoading, router, locale]);

  return null;
}
