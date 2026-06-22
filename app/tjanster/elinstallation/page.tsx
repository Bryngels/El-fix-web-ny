import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/service-page";
import { servicePages } from "@/lib/site-content";

const service = servicePages["elinstallation"];

export const metadata: Metadata = {
  title: "Elinstallation Sundsvall | El-Fix",
  description: service.description,
};

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
