import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page";
import { servicePages } from "@/lib/site-content";

const service = servicePages["laddbox"];

export const metadata: Metadata = {
  title: "Installera laddbox Sundsvall | El-Fix",
  description: service.description,
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
