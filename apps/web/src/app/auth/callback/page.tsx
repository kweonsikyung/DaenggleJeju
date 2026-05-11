"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/api/useAuth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { mutateUser } = useUser();

  useEffect(() => {
    (async () => {
      try {
        await mutateUser();
      } finally {
        router.replace("/map");
      }
    })();
  }, [mutateUser, router]);
  return (
    <div className="flex h-screen items-center justify-center text-gray-600">로그인 처리 중</div>
  );
}
