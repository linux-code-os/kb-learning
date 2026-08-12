"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kb-lang");
      if (saved === "en" || saved === "ru") {
        router.replace(`/${saved}`);
        return;
      }
      
      const lang = navigator.language;
      if (lang.startsWith("ru")) {
        router.replace("/ru");
      } else {
        router.replace("/en");
      }
    } catch {
      router.replace("/ru");
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b' }}>
      <div style={{ width: 24, height: 24, border: '2px solid #333', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
