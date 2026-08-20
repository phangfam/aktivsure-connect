import { createClient } from "@/lib/supabase/server";
import type { ContactWithRelations } from "./types";

export type NewContact = {
  name: string;
  phone: string | null;
  email: string | null;
  source_id: string | null;
  product_id: string | null;
  consent_given: boolean;
  consent_timestamp: string;
  privacy_policy_version: string;
  notes?: string | null;
};

export async function insertContact(contact: NewContact) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert(contact)
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

export async function insertConsentLog(input: {
  contact_id: string;
  consent_type: string;
  privacy_policy_version: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("consent_logs").insert(input);
  if (error) throw error;
}

export async function getContacts(): Promise<ContactWithRelations[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*, lead_sources(name, slug), products(name, slug)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as ContactWithRelations[];
}
