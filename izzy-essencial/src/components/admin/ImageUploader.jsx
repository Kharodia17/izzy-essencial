import { useState } from "react";

function toDriveDirectUrl(url) {
  if (!url) return url;
  // Convert share link: https://drive.google.com/file/d/FILE_ID/view?...
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  // Already a direct uc link — leave it
  return url;
}

export default function ImageUploader({ value, onChange }) {
  const [input, setInput] = useState(value || "");
  const [preview, setPreview] = useState(value ? toDriveDirectUrl(value) : "");
  const [imgError, setImgError] = useState(false);

  function handleApply() {
    const direct = toDriveDirectUrl(input.trim());
    setPreview(direct);
    setImgError(false);
    onChange(direct);
  }

  function handleClear() {
    setInput("");
    setPreview("");
    onChange("");
  }

  return (
    <div className="space-y-3">
      {preview && !imgError ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ) : (
        <div className="w-full h-40 rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-center px-4">
          <span className="material-symbols-outlined text-[32px] text-outline">image</span>
          <p className="text-label-md font-label text-on-surface-variant">
            {imgError ? "Não foi possível carregar a imagem — verifique o link." : "Paste a Google Drive or image URL below"}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="url"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApply())}
          placeholder="https://drive.google.com/file/d/..."
          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-[14px]"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={!input.trim()}
          className="px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label text-label-md hover:opacity-90 disabled:opacity-40 transition-opacity whitespace-nowrap"
        >
          Apply
        </button>
      </div>

      <p className="font-label text-[11px] text-on-surface-variant">
        Google Drive: share the file as "Anyone with the link" then paste the link above.
        Drive share links are converted automatically.
      </p>
    </div>
  );
}
