"use server";

import { randomUUID } from "node:crypto";
import { insertContact, insertConsentLog } from "@/lib/data/contacts";
import { getLeadSourceBySlug } from "@/lib/data/sources";
import { PRIVACY_POLICY_VERSION } from "@/lib/data/types";

export type EscalationState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitEscalation(
  _prevState: EscalationState,
  formData: FormData,
): Promise<EscalationState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const consent = formData.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name is required.";
  if (!phone && !email) {
    fieldErrors.phone = "Enter a phone number or email.";
    fieldErrors.email = "Enter a phone number or email.";
  }
  if (!consent) fieldErrors.consent = "You must consent to continue.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, message: "Please fix the errors below." };
  }

  try {
    const chatbotSource = await getLeadSourceBySlug("chatbot");
    const contactId = randomUUID();
    const consentTimestamp = new Date().toISOString();

    await insertContact({
      id: contactId,
      name,
      phone: phone || null,
      email: email || null,
      source_id: chatbotSource?.id ?? null,
      product_id: null,
      consent_given: true,
      consent_timestamp: consentTimestamp,
      privacy_policy_version: PRIVACY_POLICY_VERSION,
      notes: note || null,
    });

    await insertConsentLog({
      contact_id: contactId,
      consent_type: "marketing_opt_in",
      privacy_policy_version: PRIVACY_POLICY_VERSION,
    });

    return { status: "success" };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
    };
  }
}
