import { DeskProvider } from "@/components/desk/DeskContext";
import { DeskAuthProvider } from "@/components/desk/DeskAuthContext";
import { DeskTopBar } from "@/components/desk/DeskTopBar";
import { GlobalSearchModal } from "@/components/desk/global-search/GlobalSearchModal";
import { GlobalSearchProvider } from "@/components/desk/global-search/GlobalSearchProvider";
import { deskPaper } from "@/components/desk/desk-paper";

export default function DeskShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeskAuthProvider>
      <DeskProvider>
        <GlobalSearchProvider>
          <div className={`desk-app flex min-h-dvh flex-col ${deskPaper.page} ${deskPaper.ink}`}>
            <DeskTopBar />
            <main className={`min-w-0 flex-1 ${deskPaper.page}`}>{children}</main>
            <GlobalSearchModal />
          </div>
        </GlobalSearchProvider>
      </DeskProvider>
    </DeskAuthProvider>
  );
}
