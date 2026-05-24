"use client";

import { Suspense } from "react";
import StoryEditorPage from "./StoryEditorPage";

export default function StoryEditorRoute() {
  return (
    <Suspense fallback={null}>
      <StoryEditorPage />
    </Suspense>
  );
}
