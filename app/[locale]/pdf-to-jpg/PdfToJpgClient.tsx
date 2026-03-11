"use client";

import { useMemo, useState, type ChangeEvent } from "react";

import type { Locale } from "@/src/lib/i18n";
import { messages } from "@/src/lib/i18n";

type Stage = "idle" | "preparing" | "uploading" | "converting" | "completed";
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;

const isValidPdfFile = (candidate: File) => {
  const isPdf = candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf");
  const isWithinSizeLimit = candidate.size <= MAX_FILE_SIZE_BYTES;

  return isPdf && isWithinSizeLimit;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function PdfToJpgClient({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [message, setMessage] = useState<string>(t.ready);

  const isProcessing = stage !== "idle" && stage !== "completed";
  const isValidFile = useMemo(() => {
    if (!file) {
      return false;
    }

    return isValidPdfFile(file);
  }, [file]);
  const canConvert = useMemo(() => isValidFile && !isProcessing, [isValidFile, isProcessing]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setMessage(selected && isValidPdfFile(selected) ? t.ready : t.noFile);
    if (stage === "completed") {
      setStage("idle");
    }
  };

  const handleConvert = async () => {
    if (!isValidFile) {
      setMessage(t.chooseAFileFirst);
      return;
    }

    setStage("preparing");
    setMessage(t.preparing);
    await wait(500);

    setStage("uploading");
    setMessage(t.uploading);
    await wait(700);

    setStage("converting");
    setMessage(t.converting);
    await wait(900);

    setStage("completed");
    setMessage(`${t.completed}. ${t.backendNotConnectedYet}`);
  };

  const handleReset = () => {
    setFile(null);
    setStage("idle");
    setMessage(t.ready);
    const fileInput = document.getElementById("pdf-file") as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const statusText =
    stage === "idle" ? t.ready : stage === "completed" ? t.completed : `${t.processing}: ${message}`;

  return (
    <main className="mx-auto max-w-xl rounded-xl border p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold">{t.title}</h1>

      <div className="space-y-3">
        <label htmlFor="pdf-file" className="block text-sm font-medium">
          {t.fileLabel}
        </label>
        <input
          id="pdf-file"
          type="file"
          accept="application/pdf"
          disabled={isProcessing}
          onChange={handleFileChange}
          className="block w-full text-sm"
        />
        <p className="text-sm text-gray-600">{file ? file.name : t.noFile}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          disabled={!canConvert}
          onClick={handleConvert}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isProcessing ? `${t.processing}...` : t.convert}
        </button>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handleReset}
          className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.reset}
        </button>
      </div>

      <div className="mt-5 rounded-md border bg-gray-50 p-3 text-sm">
        <p>{statusText}</p>
        {stage !== "idle" && <p className="mt-1 text-gray-700">{message}</p>}
      </div>
    </main>
  );
}
