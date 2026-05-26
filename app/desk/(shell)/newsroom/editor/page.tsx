"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import StoryEditorPage from "./StoryEditorPage";
import { useDeskAuth } from "@/components/desk/DeskAuthContext";
import { EditorReviewDashboard, type ReviewTab } from "@/components/desk/EditorReviewDashboard";
import type { Article } from "@/lib/supabase/types";
import {
  deleteArticleClient,
  fetchArticlesByStatusClient,
  publishArticleClient,
  updateArticleClient,
} from "@/lib/supabase/queries/articles.client";

function EditorRouteInner() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const { currentRole } = useDeskAuth();

  const isWriterView = mode === "write" || currentRole === "writer" || currentRole === "editor";

  if (isWriterView) {
    return <StoryEditorPage />;
  }

  return <PrincipalReviewDashboard />;
}

function PrincipalReviewDashboard() {
  const [tab, setTab] = useState<ReviewTab>("Needs Review");
  const [reviewArticles, setReviewArticles] = useState<Article[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [draftArticles, setDraftArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectionNotes, setRejectionNotes] = useState("");
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    const [review, published, drafts] = await Promise.all([
      fetchArticlesByStatusClient("review"),
      fetchArticlesByStatusClient("published"),
      fetchArticlesByStatusClient("draft"),
    ]);

    if (review.error || published.error || drafts.error) {
      setLoadError(review.error?.message ?? published.error?.message ?? drafts.error?.message ?? "Failed to load articles.");
      setReviewArticles([]);
      setPublishedArticles([]);
      setDraftArticles([]);
    } else {
      setReviewArticles(review.data ?? []);
      setPublishedArticles(published.data ?? []);
      setDraftArticles(drafts.data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const rejectedArticles = useMemo(
    () => draftArticles.filter((a) => Boolean(a.rejection_notes?.trim())),
    [draftArticles],
  );

  const plainDrafts = useMemo(
    () => draftArticles.filter((a) => !a.rejection_notes?.trim()),
    [draftArticles],
  );

  const tabArticles = useMemo(() => {
    switch (tab) {
      case "Needs Review":
        return reviewArticles;
      case "Published":
        return publishedArticles;
      case "Drafts":
        return plainDrafts;
      case "Rejected":
        return rejectedArticles;
      default:
        return [];
    }
  }, [tab, reviewArticles, publishedArticles, plainDrafts, rejectedArticles]);

  useEffect(() => {
    if (tabArticles.length === 0) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !tabArticles.some((a) => a.id === selectedId)) {
      setSelectedId(tabArticles[0].id);
    }
  }, [tabArticles, selectedId]);

  const selected = tabArticles.find((a) => a.id === selectedId) ?? null;

  useEffect(() => {
    setRejectionNotes(selected?.rejection_notes ?? "");
  }, [selected?.id, selected?.rejection_notes]);

  async function runAction(action: () => Promise<void>) {
    setActionPending(true);
    setActionError(null);
    try {
      await action();
      await loadAll();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setActionPending(false);
    }
  }

  async function handleApprovePublish() {
    if (!selected) return;
    await runAction(async () => {
      const result = await publishArticleClient(selected.id, {
        title: selected.title,
        slug: selected.slug,
        excerpt: selected.excerpt,
        body: selected.body,
        status: "published",
        hero_image_url: selected.hero_image_url,
        author_id: selected.author_id,
        weight: selected.weight,
      });
      if (result.error) throw new Error(result.error.message);
    });
  }

  async function handleReject() {
    if (!selected || !rejectionNotes.trim()) return;
    await runAction(async () => {
      const result = await updateArticleClient(selected.id, {
        status: "draft",
        rejection_notes: rejectionNotes.trim(),
      });
      if (result.error) throw new Error(result.error.message);
    });
  }

  async function handleSaveDraft() {
    if (!selected) return;
    await runAction(async () => {
      const result = await updateArticleClient(selected.id, {
        status: "draft",
        title: selected.title,
        slug: selected.slug,
        excerpt: selected.excerpt,
        body: selected.body,
        weight: selected.weight,
      });
      if (result.error) throw new Error(result.error.message);
    });
  }

  async function handleUnpublish() {
    if (!selected) return;
    await runAction(async () => {
      const result = await updateArticleClient(selected.id, {
        status: "draft",
        published_at: null,
      });
      if (result.error) throw new Error(result.error.message);
    });
  }

  async function handleDelete() {
    if (!selected) return;
    await runAction(async () => {
      const result = await deleteArticleClient(selected.id);
      if (result.error) throw new Error(result.error.message);
      setSelectedId(null);
    });
  }

  return (
    <EditorReviewDashboard
      tab={tab}
      onTabChange={setTab}
      articles={tabArticles}
      loading={loading}
      loadError={loadError}
      selectedId={selectedId}
      onSelect={setSelectedId}
      rejectionNotes={rejectionNotes}
      onRejectionNotesChange={setRejectionNotes}
      onApprovePublish={() => void handleApprovePublish()}
      onReject={() => void handleReject()}
      onSaveDraft={() => void handleSaveDraft()}
      onUnpublish={() => void handleUnpublish()}
      onDelete={() => void handleDelete()}
      actionPending={actionPending}
      actionError={actionError}
    />
  );
}

export default function StoryEditorRoute() {
  return (
    <Suspense fallback={null}>
      <EditorRouteInner />
    </Suspense>
  );
}
