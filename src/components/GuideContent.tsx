import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, BriefcaseBusiness, Check, ChevronDown,
  ChevronRight, ClipboardCheck, Database, FileCode2, Hash, House, Info, Layers3, Link2, ListChecks,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Markdown from "react-markdown";
import {
  checklistTotal, conclusion, documents, relationshipRows, standards, supportingDocuments, workflow, workflowNote,
} from "../data/guide";
import type { DocumentId, GuideDocument, PageId } from "../data/guide";
import { RouteLink, routeHref } from "../navigation";
import type { TocItem } from "../navigation";
import Blueprint from "./Blueprint";

export const documentIcons: Record<DocumentId, LucideIcon> = {
  brd: BriefcaseBusiness,
  prd: Layers3,
  srs: FileCode2,
  erd: Database,
  uat: ClipboardCheck,
};

export type ChecklistState = {
  checks: Partial<Record<DocumentId, number[]>>;
  toggle: (id: DocumentId, index: number) => void;
  reset: (id: DocumentId) => void;
};

type PageProps = {
  toc: TocItem[];
  activeSection: string;
  checklist: ChecklistState;
};

function Breadcrumb({ current, category }: { current: string; category?: string }) {
  return (
    <nav className="breadcrumb" aria-label="Jejak navigasi">
      <ol>
        <li><RouteLink page="ikhtisar"><House size={15} strokeWidth={1.75} aria-hidden="true" />Panduan</RouteLink></li>
        {category && <li><ChevronRight size={13} aria-hidden="true" /><RouteLink page="ikhtisar" section="dokumen">{category}</RouteLink></li>}
        <li><ChevronRight size={13} aria-hidden="true" /><span aria-current="page">{current}</span></li>
      </ol>
    </nav>
  );
}

function DocumentGlyph({ id }: { id: DocumentId }) {
  const Icon = documentIcons[id];
  return <span className={`document-glyph tone-${id}`}><Icon size={20} strokeWidth={1.75} aria-hidden="true" /></span>;
}

function TocLinks({ page, toc, activeSection, onSelect }: { page: PageId; toc: TocItem[]; activeSection: string; onSelect?: () => void }) {
  return (
    <ul className="toc-links">
      {toc.map(({ id, title }) => (
        <li key={id}>
          <RouteLink page={page} section={id} aria-current={activeSection === id ? "location" : undefined} onClick={onSelect}>{title}</RouteLink>
        </li>
      ))}
    </ul>
  );
}

function ReadingLayout({ page, toc, activeSection, children }: Omit<PageProps, "checklist"> & { page: PageId; children: ReactNode }) {
  const mobileToc = useRef<HTMLDetailsElement>(null);
  return (
    <div className="reading-layout workspace-width">
      <div className="reading-content">
        <details className="mobile-toc" ref={mobileToc}>
          <summary><ListChecks size={17} aria-hidden="true" /> Di halaman ini <ChevronDown size={16} aria-hidden="true" className="details-chevron" /></summary>
          <nav aria-label="Daftar isi"><TocLinks page={page} toc={toc} activeSection={activeSection} onSelect={() => { if (mobileToc.current) mobileToc.current.open = false; }} /></nav>
        </details>
        {children}
        <footer className="reading-footer">
          <span><BookOpen size={15} aria-hidden="true" /> Panduan Dokumentasi Software</span>
          <RouteLink page={page}><ArrowUp size={14} aria-hidden="true" /> Kembali ke atas</RouteLink>
        </footer>
      </div>
      <aside className="reading-rail">
        <nav className="toc-nav" aria-label="Daftar isi">
          <h2>Di halaman ini</h2>
          <TocLinks page={page} toc={toc} activeSection={activeSection} />
          <RouteLink page={page} className="rail-top"><ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" /> Kembali ke atas</RouteLink>
        </nav>
      </aside>
    </div>
  );
}

function Prose({ children }: { children: string }) {
  return <div className="prose-content"><Markdown>{children}</Markdown></div>;
}

function SectionHeading({ page, id, children }: { page: PageId; id: string; children: string }) {
  return (
    <div className="anchored-heading">
      <h3>{children}</h3>
      <RouteLink page={page} section={id} className="heading-anchor" aria-label={`Tautan ke ${children}`}><Hash size={16} aria-hidden="true" /></RouteLink>
    </div>
  );
}

function Progress({ value, total, label }: { value: number; total: number; label: string }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={total}>
      <span style={{ width: `${(value / total) * 100}%` }} />
    </div>
  );
}

function getChecklistCount(checklist: ChecklistState) {
  return documents.reduce((sum, { id }) => sum + (checklist.checks[id]?.length ?? 0), 0);
}

export function OverviewPage({ toc, activeSection, checklist }: PageProps) {
  const checkedCount = getChecklistCount(checklist);
  return (
    <>
      <header className="overview-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner workspace-width">
          <Breadcrumb current="Ikhtisar" />
          <Blueprint />
          <div className="hero-copy">
            <p className="eyebrow"><span aria-hidden="true" /> Referensi Pengembangan</p>
            <h1><span>Panduan Dokumentasi</span>{" "}<span>Pengembangan Software</span></h1>
            <p className="hero-description">Panduan praktis menyusun <strong>BRD, PRD, SRS, ERD, dan UAT</strong>, dari kebutuhan bisnis hingga penerimaan pengguna.</p>
            <div className="hero-actions">
              <RouteLink page="ikhtisar" section="dokumen" className="action-primary">Jelajahi Dokumen <ArrowDown size={16} strokeWidth={2} aria-hidden="true" /></RouteLink>
              <RouteLink page="ikhtisar" section="alur" className="action-text">Lihat Alur Dokumentasi <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" /></RouteLink>
            </div>
          </div>
        </div>
      </header>

      <ReadingLayout page="ikhtisar" toc={toc} activeSection={activeSection}>
        <section className="content-section primary-documents" id="dokumen" tabIndex={-1}>
          <h2>Dokumen Utama</h2>
          <p className="section-lead">Lima dokumen inti untuk setiap tahap pengembangan software.</p>
          <div className="document-list">
            {documents.map((doc) => (
              <RouteLink className="document-row" page={doc.id} key={doc.id}>
                <DocumentGlyph id={doc.id} />
                <span className="document-row-copy">
                  <span className="document-row-name"><strong>{doc.id.toUpperCase()}</strong><span className="name-separator" aria-hidden="true" /><span>{doc.title}</span></span>
                  <span className="document-row-summary">{doc.summary}</span>
                </span>
                <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" className="document-row-arrow" />
              </RouteLink>
            ))}
          </div>
        </section>

        <section className="content-section" id="hubungan" tabIndex={-1}>
          <h2>Hubungan Antar-Dokumen</h2>
          <p className="section-lead">Kelima dokumen saling terhubung: keputusan di satu tahap menjadi acuan bagi tahap berikutnya.</p>
          <div className="table-scroll">
            <table className="reference-table">
              <thead><tr><th scope="col">Dokumen</th><th scope="col">Pertanyaan utama</th><th scope="col">Menjadi acuan untuk</th></tr></thead>
              <tbody>
                {relationshipRows.map(({ id, question, reference }) => (
                  <tr key={id} id={`hubungan-${id}`} tabIndex={-1}>
                    <th scope="row"><RouteLink page={id}>{id.toUpperCase()}</RouteLink></th>
                    <td>{question}</td>
                    <td>{reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="reference-subsection" id="alur" tabIndex={-1}>
            <SectionHeading page="ikhtisar" id="alur">Alur Kerja Dokumentasi</SectionHeading>
            <ol className="workflow-list">
              {workflow.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
            </ol>
            <div className="note"><Info size={18} aria-hidden="true" /><p><strong>Catatan:</strong> {workflowNote}</p></div>
          </div>
        </section>

        <section className="content-section" id="pendukung" tabIndex={-1}>
          <h2>Dokumen Pendukung</h2>
          <p className="section-lead">Lima dokumen utama tidak selalu cukup. Pilih dokumen pendukung sesuai kompleksitas dan kebutuhan proyek.</p>
          <div className="table-scroll">
            <table className="reference-table supporting-table">
              <thead><tr><th scope="col">Dokumen</th><th scope="col">Isi dan kegunaan</th></tr></thead>
              <tbody>
                {supportingDocuments.map(([title, description], index) => (
                  <tr key={title} id={`pendukung-${index + 1}`} tabIndex={-1}><th scope="row">{title}</th><td>{description}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="content-section" id="standar" tabIndex={-1}>
          <h2>Standar Dokumentasi</h2>
          <p className="section-lead">Kelola versi, status, dan keterkaitan requirement agar dokumen tetap dapat ditinjau dan ditelusuri.</p>
          <div className="numbered-sections">
            {standards.map((item, index) => (
              <section className="numbered-section" key={item.id} id={item.id} tabIndex={-1}>
                <span className="section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <SectionHeading page="ikhtisar" id={item.id}>{item.title}</SectionHeading>
                  {item.id === "traceability" && (
                    <div className="trace-flow" aria-label="Urutan penelusuran kebutuhan">
                      {["BRD", "PRD", "SRS / ERD", "Development", "Test Case", "UAT Result"].map((step, stepIndex) => (
                        <span key={step}>{stepIndex > 0 && <ArrowRight size={13} aria-hidden="true" />}<code>{step}</code></span>
                      ))}
                    </div>
                  )}
                  <Prose>{item.body}</Prose>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="content-section" id="checklist" tabIndex={-1}>
          <h2>Checklist Kelengkapan</h2>
          <p className="section-lead">Periksa kelengkapan setiap dokumen sebelum dinyatakan siap. Progres tersimpan di browser ini.</p>
          <div className="checklist-preview">
            <div>
              <strong>{checkedCount} dari {checklistTotal} kriteria terpenuhi</strong>
              <Progress value={checkedCount} total={checklistTotal} label="Progres seluruh checklist" />
            </div>
            <RouteLink page="checklist" className="action-primary">Buka Checklist <ArrowRight size={16} aria-hidden="true" /></RouteLink>
          </div>
        </section>

        <section className="content-section" id="penutup" tabIndex={-1}>
          <h2>Penutup</h2>
          <Prose>{conclusion}</Prose>
        </section>
      </ReadingLayout>
    </>
  );
}

function ChecklistGroup({ doc, checklist, standalone = false }: { doc: GuideDocument; checklist: ChecklistState; standalone?: boolean }) {
  const values = checklist.checks[doc.id] ?? [];
  const acronym = doc.id.toUpperCase();
  return (
    <section id={standalone ? "checklist" : doc.id} className="content-section checklist-section" aria-labelledby={`checklist-heading-${doc.id}`} tabIndex={-1}>
      <div className="checklist-heading">
        <div className="checklist-title">
          {!standalone && <DocumentGlyph id={doc.id} />}
          <div>
            <h2 id={`checklist-heading-${doc.id}`}>{standalone ? "Checklist Kelengkapan" : acronym}</h2>
            {!standalone && <RouteLink page={doc.id} className="checklist-doc-link">{doc.title} <ArrowRight size={13} aria-hidden="true" /></RouteLink>}
          </div>
        </div>
        <div className="checklist-mini-progress">
          <span aria-live="polite">{values.length} / {doc.checklist.length} selesai</span>
          <Progress value={values.length} total={doc.checklist.length} label={`Progres ${acronym}`} />
        </div>
      </div>
      <div className="check-items">
        {doc.checklist.map((item, index) => (
          <label key={item} className="check-row">
            <input type="checkbox" checked={values.includes(index)} onChange={() => checklist.toggle(doc.id, index)} />
            <span className="check-box" aria-hidden="true"><Check size={13} strokeWidth={2.5} /></span>
            <span className="check-text">{item}</span>
          </label>
        ))}
      </div>
      {values.length > 0 && (
        <button className="reset-button" onClick={() => { if (window.confirm(`Kosongkan semua centang untuk ${acronym}?`)) checklist.reset(doc.id); }}>Atur ulang {acronym}</button>
      )}
    </section>
  );
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Embedded previews may restrict the Clipboard API.
    }
  }
  const active = document.activeElement;
  const field = document.createElement("textarea");
  field.value = text;
  field.style.cssText = "position:fixed;left:0;top:0;opacity:0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
    if (active instanceof HTMLElement) active.focus({ preventScroll: true });
  }
}

function CopyLink({ page }: { page: PageId }) {
  const [status, setStatus] = useState<"copied" | "failed" | "idle">("idle");
  const timeout = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timeout.current), []);
  return (
    <button className="action-text" onClick={async () => {
      const url = new URL(routeHref(page), window.location.href).href;
      setStatus(await copyText(url) ? "copied" : "failed");
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setStatus("idle"), 3000);
    }}>
      {status === "copied" ? <Check size={17} aria-hidden="true" /> : <Link2 size={17} aria-hidden="true" />}
      <span aria-live="polite">{status === "copied" ? "Tautan disalin" : status === "failed" ? "Salin URL dari browser" : "Salin tautan"}</span>
    </button>
  );
}

export function DocumentPage({ doc, toc, activeSection, checklist }: PageProps & { doc: GuideDocument }) {
  const acronym = doc.id.toUpperCase();
  const position = documents.findIndex(({ id }) => id === doc.id);
  const previous = documents[position - 1];
  const next = documents[position + 1];
  const sectionsIndex = useRef<HTMLDetailsElement>(null);
  return (
    <>
      <header className={`article-header tone-${doc.id}`}>
        <div className="workspace-width article-header-inner">
          <Breadcrumb current={acronym} category="Dokumen Utama" />
          <div className="article-heading">
            <div className="article-eyebrow"><DocumentGlyph id={doc.id} /><p className="eyebrow">Dokumen {doc.number} / 05</p></div>
            <h1><span>{acronym}</span> {doc.title}</h1>
            {doc.id === "erd" && <p className="article-subtitle">dan Dokumentasi Database</p>}
            <p className="article-description">{doc.summary}</p>
            <div className="hero-actions">
              <RouteLink page={doc.id} section="struktur" className="action-primary">Lihat Struktur <ArrowDown size={16} aria-hidden="true" /></RouteLink>
              <CopyLink page={doc.id} />
            </div>
          </div>
        </div>
      </header>
      <ReadingLayout page={doc.id} toc={toc} activeSection={activeSection}>
        <section className="content-section" id="tujuan" tabIndex={-1}>
          <h2>Tujuan Dokumen</h2>
          <Prose>{doc.purpose}</Prose>
        </section>
        <section className="content-section" id="pihak" tabIndex={-1}>
          <h2>Pihak yang Terlibat</h2>
          <Prose>{doc.participants.map((participant) => `- ${participant}`).join("\n")}</Prose>
        </section>
        <section className="content-section" id="struktur" tabIndex={-1}>
          <h2>Struktur dan Isi {acronym}</h2>
          <p className="section-lead">Gunakan {doc.structure.length} bagian berikut sebagai kerangka dan sesuaikan dengan kebutuhan proyek.</p>
          <details className="section-index-details" ref={sectionsIndex}>
            <summary><ListChecks size={17} aria-hidden="true" /> Lompat ke bagian <ChevronDown size={16} aria-hidden="true" className="details-chevron" /></summary>
            <ol>
              {doc.structure.map(({ id, title }) => <li key={id}><RouteLink page={doc.id} section={id} onClick={() => { if (sectionsIndex.current) sectionsIndex.current.open = false; }}>{title}</RouteLink></li>)}
            </ol>
          </details>
          <div className="numbered-sections">
            {doc.structure.map((item, index) => (
              <section className="numbered-section" key={item.id} id={item.id} tabIndex={-1}>
                <span className="section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><SectionHeading page={doc.id} id={item.id}>{item.title}</SectionHeading><Prose>{item.body}</Prose></div>
              </section>
            ))}
          </div>
        </section>
        <section className="content-section" id="hasil" tabIndex={-1}>
          <h2>Hasil Akhir {acronym}</h2>
          <Prose>{doc.outcome}</Prose>
        </section>
        <ChecklistGroup doc={doc} checklist={checklist} standalone />
        <nav className="article-pagination" aria-label="Dokumen sebelumnya dan selanjutnya">
          <RouteLink page={previous?.id ?? "ikhtisar"} section={previous ? undefined : "dokumen"} className="pagination-link">
            <ArrowLeft size={17} aria-hidden="true"/><span><small>Sebelumnya</small><strong>{previous ? previous.id.toUpperCase() : "Dokumen Utama"}</strong></span>
          </RouteLink>
          <RouteLink page={next?.id ?? "checklist"} className="pagination-link pagination-next">
            <span><small>Selanjutnya</small><strong>{next ? next.id.toUpperCase() : "Checklist Kelengkapan"}</strong></span><ArrowRight size={17} aria-hidden="true" />
          </RouteLink>
        </nav>
      </ReadingLayout>
    </>
  );
}

export function ChecklistPage({ toc, activeSection, checklist }: PageProps) {
  const count = getChecklistCount(checklist);
  return (
    <>
      <header className="article-header">
        <div className="workspace-width article-header-inner">
          <Breadcrumb current="Checklist Kelengkapan" />
          <div className="article-heading">
            <div className="article-eyebrow"><span className="document-glyph tone-brd"><ListChecks size={20} strokeWidth={1.75} aria-hidden="true" /></span><p className="eyebrow">Referensi Praktik</p></div>
            <h1>Checklist Kelengkapan</h1>
            <p className="article-description">Centang kriteria yang sudah terpenuhi sebelum dokumen dinyatakan siap. Progres tersimpan di browser ini.</p>
            <div className="overall-progress">
              <span aria-live="polite"><strong>{count} dari {checklistTotal}</strong> kriteria terpenuhi</span>
              <Progress value={count} total={checklistTotal} label="Progres seluruh checklist" />
            </div>
          </div>
        </div>
      </header>
      <ReadingLayout page="checklist" toc={toc} activeSection={activeSection}>
        {documents.map((doc) => <ChecklistGroup key={doc.id} doc={doc} checklist={checklist} />)}
      </ReadingLayout>
    </>
  );
}