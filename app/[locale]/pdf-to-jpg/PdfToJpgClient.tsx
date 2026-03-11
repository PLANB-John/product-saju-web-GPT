"use client";

import { useMemo, useState, type ChangeEvent } from "react";

import type { Locale } from "@/src/lib/i18n";
import { messages } from "@/src/lib/i18n";

type Stage = "idle" | "preparing" | "uploading" | "converting" | "completed";
type FileValidationError = "invalid_type" | "too_large";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;
const STAGE_ORDER: Stage[] = ["preparing", "uploading", "converting", "completed"];

const getFileValidationError = (candidate: File | null): FileValidationError | null => {
  if (!candidate) {
    return null;
  }

  const isPdf = candidate.type === "application/pdf" || candidate.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    return "invalid_type";
  }

  if (candidate.size > MAX_FILE_SIZE_BYTES) {
    return "too_large";
  }

  return null;
};

const isValidPdfFile = (candidate: File | null) => candidate !== null && getFileValidationError(candidate) === null;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileSizeLabel = (size: number) => `${(size / (1024 * 1024)).toFixed(2)} MB`;

export default function PdfToJpgClient({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [message, setMessage] = useState<string>(t.ready);

  const isProcessing = stage !== "idle" && stage !== "completed";
  const validationError = useMemo(() => getFileValidationError(file), [file]);
  const isValidFile = useMemo(() => isValidPdfFile(file), [file]);
  const canConvert = useMemo(() => isValidFile && !isProcessing, [isValidFile, isProcessing]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);

    if (!selected) {
      setMessage(t.noFile);
    } else {
      const selectedValidationError = getFileValidationError(selected);
      if (selectedValidationError === "invalid_type") {
        setMessage("Only PDF files are allowed.");
      } else if (selectedValidationError === "too_large") {
        setMessage("File is too large. Max size is 15 MB.");
      } else {
        setMessage(t.ready);
      }
    }

    if (stage === "completed") {
      setStage("idle");
    }
  };

  const handleConvert = async () => {
    if (!canConvert) {
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

  const currentStageIndex = STAGE_ORDER.indexOf(stage);

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
        <p className="text-sm text-gray-600">{file ? `${file.name} (${getFileSizeLabel(file.size)})` : t.noFile}</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          disabled={!canConvert}
          onClick={handleConvert}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${
            canConvert
              ? "cursor-pointer bg-black hover:bg-black/90"
              : "cursor-not-allowed bg-black/40 opacity-70"
          }`}
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

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        {STAGE_ORDER.map((step, index) => {
          const isReached = stage === "completed" || (currentStageIndex >= 0 && index <= currentStageIndex);
          const label =
            step === "preparing"
              ? t.preparing
              : step === "uploading"
                ? t.uploading
                : step === "converting"
                  ? t.converting
                  : t.completed;

          return (
            <div
              key={step}
              className={`rounded-md border px-2 py-1 text-center ${
                isReached ? "border-black bg-black text-white" : "border-gray-300 bg-gray-100 text-gray-600"
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-md border bg-gray-50 p-3 text-sm">
        <p>{statusText}</p>
        {stage !== "idle" && <p className="mt-1 text-gray-700">{message}</p>}
        {validationError === "invalid_type" && <p className="mt-1 text-red-600">Only PDF files are allowed.</p>}
        {validationError === "too_large" && <p className="mt-1 text-red-600">File must be 15 MB or smaller.</p>}
      </div>
    </main>
  );
}
