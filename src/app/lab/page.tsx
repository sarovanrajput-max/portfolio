import type { Metadata } from "next";
import { LabExperience } from "@/components/lab/LabExperience";

export const metadata: Metadata = { title: "ServiceNow Lab" };

export default function LabPage() {
  return <LabExperience />;
}
