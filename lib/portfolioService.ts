import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioItem {
  id?: string;          // Firestore document ID (absent before save)
  src: string;          // Logo / thumbnail image path or URL
  title: string;        // Project name
  category: string;     // e.g. "SaaS Product"
  year: string;         // e.g. "2024"
  url?: string;         // Optional link to the live project
  order?: number;       // Optional display order (lower = first)
}

// ── Collection ref ───────────────────────────────────────────────────────────

const portfolioCol = () => collection(db, "portfolio");

// ── Read ─────────────────────────────────────────────────────────────────────

/**
 * Fetch all portfolio items, sorted by `order` ascending (falls back to
 * insertion order if `order` is absent).
 */
export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  const q = query(portfolioCol(), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<PortfolioItem, "id">) }));
}

// ── Write (admin only — protected by Firestore rules) ────────────────────────

export async function addPortfolioItem(
  item: Omit<PortfolioItem, "id">
): Promise<string> {
  const ref = await addDoc(portfolioCol(), item);
  return ref.id;
}

export async function updatePortfolioItem(
  id: string,
  updates: Partial<Omit<PortfolioItem, "id">>
): Promise<void> {
  await updateDoc(doc(db, "portfolio", id), updates);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await deleteDoc(doc(db, "portfolio", id));
}
