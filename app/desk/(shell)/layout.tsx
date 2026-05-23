import { DeskProvider } from "@/components/desk/DeskContext";
import { DeskTopBar } from "@/components/desk/DeskTopBar";
import { deskPaper } from "@/components/desk/desk-paper";

export default function DeskShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeskProvider>
      <div className={`desk-app flex min-h-dvh flex-col ${deskPaper.page} ${deskPaper.ink}`}>
        <DeskTopBar />
        <main className={`min-w-0 flex-1 ${deskPaper.page}`}>{children}</main>
      </div>
    </DeskProvider>
  );
}
