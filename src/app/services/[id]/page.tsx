import React from "react";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content/dictionary";
import ServiceDetailView from "@/components/sections/ServiceDetailView";

const validIds = dictionaries.en.solutions.items.map((item) => item.id);

export function generateStaticParams() {
  return validIds.map((id) => ({ id }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!validIds.includes(id)) {
    notFound();
  }
  return <ServiceDetailView serviceId={id} />;
}
