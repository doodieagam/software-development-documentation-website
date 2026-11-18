import { ArrowDown, ArrowUp, BookOpen, CornerDownLeft, FileText, Search, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { conclusion, documents, relationshipRows, standards, supportingDocuments, workflow } from "../data/guide";
import type { Location } from "../navigation";
import { overviewToc } from "../navigation";

type SearchEntry = Location & {
  title: string;
  context: string;
  text?: string;
  type?: "page";
};

const quickLinks: SearchEntry[] = [
  ...documents.map(({ id, title, summary }) => ({
    page: id,
    title: `${id.toUpperCase()} / ${title}`,
    context: "Dokumen Utama",
    text: summary,
    type: "page" as const,
  })),
  { page: "checklist", title: "Checklist Kelengkapan", context: "Referensi", type: "page" },
];

const searchIndex: SearchEntry[] = [
  ...quickLinks,
  { page: "ikhtisar", title: "Panduan Dokumentasi Pengembangan Software", context: "Ikhtisar", type: "page" },
  ...overviewToc.map(({ id, title }) => ({
    page: "ikhtisar" as const,
    section: id,
    title,
    context: "Ikhtisar",
    text: id === "penutup" ? conclusion : undefined,
  })),
  { page: "ikhtisar", section: "alur", title: "Alur Kerja Dokumentasi", context: "Hubungan Antar-Dokumen", text: workflow.join(" ") },
  ...relationshipRows.map(({ id, question, reference }) => ({
    page: "ikhtisar" as const,
    section: `hubungan-${id}`,
    title: `Peran ${id.toUpperCase()} dalam alur dokumentasi`,
    context: "Hubungan Antar-Dokumen",
    text: `${question} ${reference}`,
  })),
  ...supportingDocuments.map(([title, text], index) => ({
    page: "ikhtisar" as const, section: `pendukung-${index + 1}`, title, context: "Dokumen Pendukung", text,
  })),
  ...standards.map(({ id, title, body }) => ({
    page: "ikhtisar" as const, section: id, title, context: "Standar Dokumentasi", text: body,
  })),
  ...documents.flatMap(({ id, purpose, participants, structure, outcome, checklist }) => {
    const context = id.toUpperCase();
    return [
      { page: id, section: "tujuan", title: `Tujuan Dokumen ${context}`, context, text: purpose },
      { page: id, section: "pihak", title: `Pihak yang Terlibat dalam ${context}`, context, text: participants.join(" ") },
      ...structure.map((item) => ({ page: id, section: item.id, title: item.title, context: `${context} / Struktur dan Isi`, text: item.body })),
      { page: id, section: "hasil", title: `Hasil Akhir ${context}`, context, text: outcome },
      { page: "checklist" as const, section: id, title: `Checklist ${context}`, context: "Checklist Kelengkapan", text: checklist.join(" ") },
    ];
  }),
];

function plainText(value: string) {
  return value.replace(/[`*]/g, "").replace(/^\s*[-+]\s+/gm, " ").replace(/\s+/g, " ").trim();
}

function searchFor(query: string) {
  const phrase = query.trim().toLowerCase();
  if (!phrase) return quickLinks;
  const tokens = phrase.split(/\s+/);
  return searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const tags = `${entry.page} ${entry.context}`.toLowerCase();
      const body = plainText(entry.text ?? "").toLowerCase();
      const matches = tokens.every((token) => title.includes(token) || tags.includes(token) || body.includes(token));
      const score = matches
        ? tokens.reduce((sum, token) => sum + (title.includes(token) ? 8 : tags.includes(token) ? 4 : 1), 0)
          + (title.includes(phrase) ? 5 : 0) + (title.startsWith(phrase) ? 3 : 0) + (entry.type === "page" ? 2 : 0)
        : 0;
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}

function excerpt(text: string, query: string) {
  const line = plainText(text);
  const match = query.trim() ? line.toLowerCase().indexOf(query.trim().toLowerCase().split(/\s+/)[0]) : -1;
  const start = match > 54 ? match - 27 : 0;
  const sample = line.slice(start, start + 105);
  return `${start ? "..." : ""}${sample}${line.length > start + sample.length ? "..." : ""}`;
}

type SearchDialogProps = {
  onClose: () => void;
  onChoose: (result: Location) => void;
};

export default function SearchDialog({ onClose, onChoose }: SearchDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const results = searchFor(query);

  useLayoutEffect(() => {
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    input.current?.focus();
    return () => node.close();
  }, []);

  useEffect(() => {
    if (!dialog.current || !dialog.current.open) return;
    const list = dialog.current.querySelector(".search-results");
    const row = dialog.current.querySelector(`[id="search-result-${selected}"]`);
    if (!list || !row) return;
    const { top, bottom } = row.getBoundingClientRect();
    const bounds = list.getBoundingClientRect();
    if (top < bounds.top) list.scrollTop -= bounds.top - top;
    if (bottom > bounds.bottom) list.scrollTop += bottom - bounds.bottom;
  }, [selected, query]);

  function handleKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing || !results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setSelected((value) => (value + direction + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      onChoose(results[selected]);
    }
  }

  return (
    <dialog
      className="search-dialog"
      ref={dialog}
      aria-label="Cari dokumentasi"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="search-panel">
        <div className="search-field">
          <Search size={21} aria-hidden="true" />
          <input
            ref={input}
            role="combobox"
            aria-label="Kata kunci pencarian"
            aria-controls="search-results"
            aria-expanded={true}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `search-result-${selected}` : undefined}
            value={query}
            placeholder="Cari dokumen, topik, atau kebutuhan..."
            onChange={(event) => { setQuery(event.target.value); setSelected(0); }}
            onKeyDown={handleKeys}
            autoComplete="off"
          />
          {query && <button className="icon-button clear-search" aria-label="Hapus kata kunci" onClick={() => { setQuery(""); setSelected(0); input.current?.focus(); }}><X size={16} /></button>}
          <button className="search-close" onClick={onClose} aria-label="Esc, tutup pencarian"><span>Esc</span><X size={17} aria-hidden="true" /></button>
        </div>
        <div className="search-category" aria-live="polite">{query.trim() ? `${results.length} hasil pencarian` : "AKSES CEPAT"}</div>
        <div className="search-results" id="search-results" role="listbox" aria-label="Hasil pencarian">
          {results.map((result, index) => {
            const Icon = result.type ? BookOpen : FileText;
            return (
              <button
                type="button"
                id={`search-result-${index}`}
                role="option"
                aria-selected={selected === index}
                tabIndex={-1}
                className="search-result"
                key={`${result.page}/${result.section}/${result.title}`}
                onMouseEnter={() => setSelected(index)}
                onClick={() => onChoose(result)}
              >
                <Icon size={17} aria-hidden="true" />
                <span className="search-result-copy">
                  <strong>{result.title}</strong>
                  <span>{result.context}{result.text && <>{" / "}{excerpt(result.text, query)}</>}</span>
                </span>
                {selected === index && <CornerDownLeft size={15} className="search-result-enter" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        {!results.length && <p className="search-empty">Tidak ditemukan hasil untuk <strong>&quot;{query.trim()}&quot;</strong>. Coba kata kunci lain, seperti KPI atau test case.</p>}
        <div className="search-hints" aria-hidden="true">
          <span><kbd><ArrowUp size={12} /></kbd><kbd><ArrowDown size={12} /></kbd> Navigasi</span>
          <span><kbd><CornerDownLeft size={12} /></kbd> Buka</span>
          <span><kbd>Esc</kbd> Tutup</span>
        </div>
      </div>
    </dialog>
  );
}