import type { ComponentType } from "react";

export type Group =
  | "All"
  | "Database"
  | "Web Frontend"
  | "Backend"
  | "Desktop"
  | "Mobile"
  | "IoT / Embedded"
  | "Data / ML"
  | "Other Tools";

export type ProjectCategory = "All" | "AI & RAG" | "Rust & Systems" | "IoT & Hardware" | "Full-Stack";

export type Project = {
  title: string;
  desc: string;
  image: string;
  pdf: string | null;
  live: string | null;
  tech: string[];
  repo?: string | null;
  codeName?: string;
  status?: string;
  category?: ProjectCategory;
  highlight?: string;
};

export type Skill = {
  name: string;
  src?: string;
  icon?: ComponentType<{ className?: string }>;
  group: Exclude<Group, "All">;
};

export type Tech = { name: string; src: string };
