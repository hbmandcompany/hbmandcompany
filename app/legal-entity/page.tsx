import { redirect } from "next/navigation";

/** Legacy URL — subscription membership moved to /subscription. */
export default function LegalEntityPage() {
  redirect("/subscription");
}
