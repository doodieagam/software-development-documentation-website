import { createContext, useContext } from "react";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { documents } from "./data/guide";
import type { PageId } from "./data/guide";

export type Location = { page: PageId; section?: string };
export type TocItem = { id: string; title: string };

export const overviewToc: TocItem[] = [
  { id: "dokumen", title: "Dokumen Utama" },
  { id: "hubungan", title: "Hubungan Antar-Dokumen" },
  { id: "pendukung", title: "Dokumen Pendukung" },
  { id: "standar", title: "Standar Dokumentasi" },
  { id: "checklist", title: "Checklist Kelengkapan" },
  { id: "penutup", title: "Penutup" },
];

export const documentToc: TocItem[] = [
  { id: "tujuan", title: "Tujuan Dokumen" },
  { id: "pihak", title: "Pihak yang Terlibat" },
  { id: "struktur", title: "Struktur dan Isi" },
  { id: "hasil", title: "Hasil Akhir" },
  { id: "checklist", title: "Checklist Kelengkapan" },
];

export const checklistToc: TocItem[] = documents.map(({ id, shortTitle }) => ({
  id,
  title: `${id.toUpperCase()} / ${shortTitle}`,
}));

const pages: PageId[] = ["ikhtisar", "checklist", ...documents.map(({ id }) => id)];

export function readLocation(): Location {
  const [page, section] = window.location.hash.replace(/^#\/?/, "").split("/");
  return { page: pages.find((id) => id === page) ?? "ikhtisar", section };
}

export function routeHref(page: PageId, section?: string) {
  return `#/${page}${section ? `/${section}` : ""}`;
}

export const NavigationContext = createContext<(page: PageId, section?: string) => void>(() => {});

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & Location;

export function RouteLink({ page, section, onClick, ...props }: RouteLinkProps) {
  const navigate = useContext(NavigationContext);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    navigate(page, section);
  }

  return <a href={routeHref(page, section)} {...props} onClick={handleClick} />;
}