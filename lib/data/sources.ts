import { createClient } from "@/lib/supabase/server";
import type { LeadSource } from "./types";

export async function getLeadSources(): Promise<LeadSource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lead_sources")
    .select("*")
    .order("name");

  if (error) throw error;
  return data ?? [];
}

export async function getLeadSourceBySlug(
  slug: string,
): Promise<LeadSource | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lead_sources")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}
