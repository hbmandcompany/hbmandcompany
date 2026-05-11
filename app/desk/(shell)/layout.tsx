import { DeskProvider } from "@/components/desk/DeskContext";
import { DeskSidebar } from "@/components/desk/DeskSidebar";
import { DeskTopBar } from "@/components/desk/DeskTopBar";

export default function DeskShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <DeskProvider>
      <div className="desk-app flex min-h-dvh bg-void text-cream">
        <DeskSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DeskTopBar />
          <main className="min-w-0 flex-1 bg-void">{children}</main>
        </div>
      </div>
    </DeskProvider>
  );
}

