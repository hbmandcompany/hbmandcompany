"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeskTickerEditor } from "@/components/desk/DeskTickerEditor";
import { useDeskAuth } from "@/components/desk/DeskAuthContext";

export default function NewsroomTickerPage() {
  const router = useRouter();
  const { currentRole } = useDeskAuth();

  useEffect(() => {
    if (currentRole !== "principal") {
      router.replace("/desk/newsroom");
    }
  }, [currentRole, router]);

  if (currentRole !== "principal") {
    return null;
  }

  return <DeskTickerEditor />;
}
