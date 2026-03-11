export const supportedLocales = ["ko", "en", "ja", "es", "de"] as const;

export type Locale = (typeof supportedLocales)[number];

type TranslationKeys =
  | "title"
  | "fileLabel"
  | "noFile"
  | "convert"
  | "preparing"
  | "uploading"
  | "converting"
  | "completed"
  | "backendNotConnectedYet"
  | "chooseAFileFirst"
  | "reset"
  | "processing"
  | "ready";

export const messages: Record<Locale, Record<TranslationKeys, string>> = {
  ko: {
    title: "PDF → JPG 변환",
    fileLabel: "PDF 파일 선택",
    noFile: "선택된 파일 없음",
    convert: "변환",
    preparing: "준비 중",
    uploading: "업로드 중",
    converting: "변환 중",
    completed: "완료",
    backendNotConnectedYet: "백엔드 업로드/변환은 아직 연결되지 않았습니다.",
    chooseAFileFirst: "먼저 파일을 선택하세요.",
    reset: "초기화",
    processing: "처리 중",
    ready: "변환할 PDF 파일을 선택하세요.",
  },
  en: {
    title: "PDF → JPG Converter",
    fileLabel: "Choose PDF file",
    noFile: "No file selected",
    convert: "Convert",
    preparing: "Preparing",
    uploading: "Uploading",
    converting: "Converting",
    completed: "Completed",
    backendNotConnectedYet: "Backend upload/conversion is not connected yet.",
    chooseAFileFirst: "Choose a file first.",
    reset: "Reset",
    processing: "Processing",
    ready: "Choose a PDF file to convert.",
  },
  ja: {
    title: "PDF → JPG 変換",
    fileLabel: "PDFファイルを選択",
    noFile: "ファイルが選択されていません",
    convert: "変換",
    preparing: "準備中",
    uploading: "アップロード中",
    converting: "変換中",
    completed: "完了",
    backendNotConnectedYet: "バックエンドのアップロード/変換はまだ接続されていません。",
    chooseAFileFirst: "先にファイルを選択してください。",
    reset: "リセット",
    processing: "処理中",
    ready: "変換するPDFファイルを選択してください。",
  },
  es: {
    title: "Conversor de PDF → JPG",
    fileLabel: "Elegir archivo PDF",
    noFile: "Ningún archivo seleccionado",
    convert: "Convertir",
    preparing: "Preparando",
    uploading: "Subiendo",
    converting: "Convirtiendo",
    completed: "Completado",
    backendNotConnectedYet: "La carga/conversión del backend aún no está conectada.",
    chooseAFileFirst: "Primero elige un archivo.",
    reset: "Restablecer",
    processing: "Procesando",
    ready: "Elige un archivo PDF para convertir.",
  },
  de: {
    title: "PDF → JPG Konverter",
    fileLabel: "PDF-Datei auswählen",
    noFile: "Keine Datei ausgewählt",
    convert: "Konvertieren",
    preparing: "Vorbereitung",
    uploading: "Wird hochgeladen",
    converting: "Wird konvertiert",
    completed: "Abgeschlossen",
    backendNotConnectedYet: "Backend-Upload/Konvertierung ist noch nicht verbunden.",
    chooseAFileFirst: "Bitte zuerst eine Datei auswählen.",
    reset: "Zurücksetzen",
    processing: "Verarbeitung",
    ready: "Wählen Sie eine PDF-Datei zur Konvertierung aus.",
  },
};

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function getMessages(locale: string) {
  return messages[isSupportedLocale(locale) ? locale : "en"];
}
