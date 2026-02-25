"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import Loading from "@/components/shared/open/Loading";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loadUser } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get("token");
      const error = searchParams.get("error");

      if (error) {
        console.error("OAuth error:", error);
        router.push("/login?error=oauth_failed");
        return;
      }

      if (token) {
        localStorage.setItem("authToken", token);

        try {
          await loadUser();

          router.push("/dashboard");
        } catch (error) {
          console.error("Failed to load user after OAuth:", error);
          router.push("/login?error=oauth_failed");
        }
      } else {
        router.push("/login");
      }
    };

    handleCallback();
  }, [searchParams, router, loadUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loading />
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
