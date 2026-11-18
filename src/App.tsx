import {
  BookOpen, Files, House, ListChecks, Menu, Moon, Search, Settings2, Sun, Workflow, X,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChecklistPage, DocumentPage, OverviewPage, documentIcons } from "./components/GuideContent";
import type { ChecklistState } from "./components/GuideContent";
import SearchDialog from "./components/SearchDialog";
import { documents } from "./data/guide";
import type { PageId } from "./data/guide";
import {
  checklistToc, documentToc, NavigationContext, overviewToc, readLocation, routeHref, RouteLink,
} from "./navigation";
import type { Location, TocItem } from "./navigation";

const themeKey = "dokum-theme";
const checklistKey = "dokum-checklist-v1";

function storageRead(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function storageWrite(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Storage can be disabled in embedded contexts. */ }
}

function readChecks(): ChecklistState["checks"] {
  try {
    const stored = JSON.parse(storageRead(checklistKey) ?? "{}");
    const sanitized: ChecklistState["checks"] = {};
    for (const doc of documents) {
      const values = stored?.[doc.id];
      if (Array.isArray(values)) {
        sanitized[doc.id] = [...new Set(values.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < doc.checklist.length))];
      }
    }
    return sanitized;
  } catch {
    return {};
  }
}

function Logo() {
  return (
    <RouteLink page="ikhtisar" className="brand" aria-label="Dokum, ikhtisar panduan">
      <span className="brand-mark"><BookOpen size={19} strokeWidth={1.9} aria-hidden="true" /></span>
      <span className="brand-name">dokum<span>.</span></span>
    </RouteLink>
  );
}

const referenceLinks = [
  { id: "hubungan", label: "Hubungan Dokumen", icon: Workflow },
  { id: "pendukung", label: "Dokumen Pendukung", icon: Files },
  { id: "standar", label: "Standar Dokumentasi", icon: Settings2 },
  { id: "checklist", label: "Checklist Kelengkapan", icon: ListChecks },
];

function Sidebar({ page, activeSection, mobileOpen }: { page: PageId; activeSection: string; mobileOpen: boolean }) {
  const overviewActive = page === "ikhtisar" && !referenceLinks.slice(0, 3).some(({ id }) => id === activeSection);
  return (
    <aside className={`sidebar${mobileOpen ? " is-open" : ""}`} id="site-sidebar">
      <div className="sidebar-inner">
        <nav aria-label="Navigasi panduan" className="sidebar-nav">
          <div className="sidebar-group">
            <h2>Mulai di sini</h2>
            <RouteLink page="ikhtisar" className="sidebar-link" aria-current={overviewActive ? "page" : undefined}>
              <House size={17} strokeWidth={1.75} aria-hidden="true" /> <span>Ikhtisar</span>
            </RouteLink>
          </div>
          <div className="sidebar-group">
            <h2>Dokumen utama</h2>
            {documents.map(({ id, shortTitle }) => {
              const Icon = documentIcons[id];
              return (
                <RouteLink page={id} className="sidebar-link sidebar-doc" aria-current={page === id ? "page" : undefined} key={id}>
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  <span><strong>{id.toUpperCase()}</strong><small>{shortTitle}</small></span>
                </RouteLink>
              );
            })}
          </div>
          <div className="sidebar-group">
            <h2>Referensi</h2>
            {referenceLinks.map(({ id, label, icon: Icon }) => {
              const isChecklist = id === "checklist";
              const current = isChecklist ? (page === "checklist" ? "page" : undefined) : (page === "ikhtisar" && activeSection === id ? "location" : undefined);
              return (
                <RouteLink page={isChecklist ? "checklist" : "ikhtisar"} section={isChecklist ? undefined : id} className="sidebar-link" aria-current={current} key={id}>
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" /><span>{label}</span>
                </RouteLink>
              );
            })}
          </div>
        </nav>
        <div className="sidebar-version">
          <BookOpen size={16} strokeWidth={1.7} aria-hidden="true" />
          <span>Versi panduan</span><code>v1.0</code>
        </div>
      </div>
    </aside>
  );
}

function useActiveSection(page: PageId, toc: TocItem[]) {
  const [active, setActive] = useState({ page, id: toc[0].id });
  useLayoutEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let id = toc[0].id;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 68;
      for (const item of toc) {
        const node = document.getElementById(item.id);
        if (node && node.getBoundingClientRect().top <= headerHeight + 100) id = item.id;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) id = toc[toc.length - 1].id;
      setActive((current) => current.id === id && current.page === page ? current : { page, id });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [page, toc]);
  return active.page === page ? active.id : toc[0].id;
}

export default function App() {
  const [location, setLocation] = useState(readLocation);
  const [theme, setTheme] = useState(() => storageRead(themeKey) === "dark" ? "dark" : "light");
  const [checks, setChecks] = useState(readChecks);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const previousPage = useRef<PageId | undefined>(undefined);
  const doc = documents.find(({ id }) => id === location.page);
  const toc = doc ? documentToc : location.page === "checklist" ? checklistToc : overviewToc;
  const activeSection = useActiveSection(location.page, toc);
  const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);

  const navigate = useCallback((page: PageId, section?: string) => {
    setMobileOpen(false);
    const hash = routeHref(page, section);
    if (window.location.hash === hash) setLocation({ page, section });
    else window.location.hash = hash;
  }, []);

  const openSearch = useCallback(() => {
    setMobileOpen(false);
    setSearchOpen(true);
  }, []);

  function selectResult(result: Location) {
    setSearchOpen(false);
    navigate(result.page, result.section);
  }

  const checklist: ChecklistState = {
    checks,
    toggle: (id, index) => setChecks((state) => {
      const values = state[id] ?? [];
      return { ...state, [id]: values.includes(index) ? values.filter((value) => value !== index) : [...values, index] };
    }),
    reset: (id) => setChecks((state) => ({ ...state, [id]: [] })),
  };

  useEffect(() => {
    const onHashChange = () => { setLocation(readLocation()); setMobileOpen(false); };
    window.addEventListener("hashchange", onHashChange);
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.history.scrollRestoration = restoration;
    };
  }, []);

  useLayoutEffect(() => {
    const hasNavigated = previousPage.current !== undefined;
    const samePage = previousPage.current === location.page;
    previousPage.current = location.page;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = samePage && !reduced ? "smooth" : "auto";
    const target = location.section ? document.getElementById(location.section) : null;
    if (target) {
      if (hasNavigated) target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior, block: "start" });
    } else {
      if (hasNavigated) document.getElementById("main-content")?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior });
    }
    document.title = doc
      ? `${doc.id.toUpperCase()} | Dokum`
      : location.page === "checklist" ? "Checklist Kelengkapan | Dokum" : "Dokum | Panduan Dokumentasi Pengembangan Software";
  }, [location, doc]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#131c2b" : "#ffffff");
    storageWrite(themeKey, theme);
  }, [theme]);

  useEffect(() => storageWrite(checklistKey, JSON.stringify(checks)), [checks]);

  useEffect(() => {
    function shortcuts(event: KeyboardEvent) {
      const element = event.target;
      const editing = element instanceof HTMLElement && (element.matches("input, textarea, select") || element.isContentEditable);
      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") || (event.key === "/" && !editing && !event.metaKey && !event.ctrlKey && !event.altKey)) {
        event.preventDefault();
        openSearch();
      } else if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", shortcuts);
    return () => window.removeEventListener("keydown", shortcuts);
  }, [mobileOpen, openSearch]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 800px)");
    const onResize = () => { if (!media.matches) setMobileOpen(false); };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overlay-open", mobileOpen || searchOpen);
    return () => document.body.classList.remove("overlay-open");
  }, [mobileOpen, searchOpen]);

  const pageProps = { toc, activeSection, checklist };

  return (
    <NavigationContext.Provider value={navigate}>
      <a href="#main-content" className="skip-link" onClick={(event) => {
        event.preventDefault();
        document.getElementById("main-content")?.focus();
      }}>Lewati ke konten</a>

      <header className="site-header">
        <div className="header-brand"><Logo /></div>
        <nav className="header-nav" aria-label="Halaman utama">
          <RouteLink page="ikhtisar" aria-current={location.page === "ikhtisar" ? "page" : doc ? "true" : undefined}>Panduan</RouteLink>
          <RouteLink page="checklist" aria-current={location.page === "checklist" ? "page" : undefined}>Checklist</RouteLink>
        </nav>
        <div className="header-tools">
          <div className="search-control">
            <button type="button" className="search-trigger" onClick={openSearch} aria-label="Cari dokumentasi" aria-haspopup="dialog" aria-keyshortcuts="Control+k Meta+k">
              <Search size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>Cari dokumentasi</span>
            </button>
            <kbd aria-hidden="true">{isMac ? "Cmd K" : "Ctrl K"}</kbd>
          </div>
          <span className="header-divider" aria-hidden="true" />
          <button className="icon-button theme-toggle" type="button" aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Moon size={19} strokeWidth={1.75} aria-hidden="true" /> : <Sun size={19} strokeWidth={1.75} aria-hidden="true" />}
          </button>
          <button
            ref={menuButton}
            type="button"
            className="icon-button mobile-menu-toggle"
            aria-label={mobileOpen ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={mobileOpen}
            aria-controls="site-sidebar"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className="site-shell">
        <Sidebar page={location.page} activeSection={activeSection} mobileOpen={mobileOpen} />
        {mobileOpen && <button type="button" className="mobile-scrim" aria-label="Tutup menu navigasi" tabIndex={-1} onClick={() => { setMobileOpen(false); menuButton.current?.focus(); }} />}
        <main className="workspace" id="main-content" tabIndex={-1} inert={mobileOpen}>
          {doc ? <DocumentPage key={doc.id} doc={doc} {...pageProps} /> : location.page === "checklist" ? <ChecklistPage {...pageProps} /> : <OverviewPage {...pageProps} />}
        </main>
      </div>

      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} onChoose={selectResult} />}
    </NavigationContext.Provider>
  );
}
