import { notFound } from "next/navigation";

import PdfToJpgClient from "./PdfToJpgClient";
import { isSupportedLocale, supportedLocales } from "@/src/lib/i18n";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export default function PdfToJpgPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <PdfToJpgClient locale={locale} />;
}
