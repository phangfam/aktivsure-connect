"use server";

import { randomUUID } from "node:crypto";
import { insertContact, insertConsentLog } from "@/lib/data/contacts";
import { PRIVACY_POLICY_VERSION } from "@/lib/data/types";

export type SubmitContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prevState: SubmitContactState,
  formData: FormData,
): Promise<SubmitContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const sourceId = String(formData.get("source_id") ?? "").trim();
  const productId = String(formData.get("product_id") ?? "").trim();
  const consent = formData.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = "Name is required.";
  if (!phone && !email) {
    fieldErrors.phone = "Enter a phone number or email.";
    fieldErrors.email = "Enter a phone number or email.";
  }
  if (!productId) fieldErrors.product_id = "Select a product.";
  if (!consent) fieldErrors.consent = "You must consent to continue.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, message: "Please fix the errors below." };
  }

  try {
    const contactId = randomUUID();
    const consentTimestamp = new Date().toISOString();
    await insertContact({
      id: contactId,
      name,
      phone: phone || null,
      email: email || null,
      source_id: sourceId || null,
      product_id: productId,
      consent_given: true,
      consent_timestamp: consentTimestamp,
      privacy_policy_version: PRIVACY_POLICY_VERSION,
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
