"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Developments() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/find-a-home");
  }, [router]);

  return null;
}
