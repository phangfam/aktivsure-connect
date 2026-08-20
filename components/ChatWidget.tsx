"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  CHAT_FLOW,
  ROOT_NODE_ID,
  ESCALATION_FORM_NODE_ID,
  type ChatOption,
} from "@/lib/chatbot/flow";
import { submitEscalation, type EscalationState } from "@/lib/actions/chatbot-escalation";

type Turn = { sender: "bot" | "user"; text: string };

const HIDDEN_PATH_PREFIXES = ["/dashboard", "/login"];

function EscalationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#0b1f3a] px-3 py-2 text-sm font-semibold text-white hover:bg-[#12305c] disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

function EscalationForm({ onSent }: { onSent: () => void }) {
  const initialState: EscalationState = { status: "idle" };
  const [state, formAction] = useActionState(submitEscalation, initialState);

  useEffect(() => {
    if (state.status === "success") {
      onSent();
    }
  }, [state.status, onSent]);

  if (state.status === "success") {
    return null;
  }

  return (
    <form action={formAction} className="space-y-2 rounded-md border border-neutral-200 bg-neutral-50 p-3">
      {state.status === "error" && state.message && !state.fieldErrors && (
        <p className="text-xs text-red-600">{state.message}</p>
      )}
      <div>
        <input
          name="name"
          placeholder="Full name"
          className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm"
        />
        {state.fieldErrors?.name && <p className="text-xs text-red-600">{state.fieldErrors.name}</p>}
      </div>
      <div>
        <input
          name="phone"
          placeholder="Phone number"
          className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm"
        />
        {state.fieldErrors?.phone && <p className="text-xs text-red-600">{state.fieldErrors.phone}</p>}
      </div>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm"
        />
      </div>
      <div>
        <textarea
          name="note"
          placeholder="What's this about? (optional)"
          rows={2}
          className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-neutral-600">
        <input type="checkbox" name="consent" className="mt-0.5 accent-[#0b1f3a]" />
        <span>
          I consent to AktivSure storing my details to follow up, per the{" "}
          <Link href="/privacy" target="_blank" className="underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {state.fieldErrors?.consent && <p className="text-xs text-red-600">{state.fieldErrors.consent}</p>}
      <EscalationSubmitButton />
    </form>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState(ROOT_NODE_ID);
  const [history, setHistory] = useState<Turn[]>([
    { sender: "bot", text: CHAT_FLOW[ROOT_NODE_ID].message },
  ]);

  if (HIDDEN_PATH_PREFIXES.some((p) => pathname?.startsWith(p))) {
    return null;
  }

  const node = CHAT_FLOW[nodeId];

  function choose(option: ChatOption) {
    const nextNode = CHAT_FLOW[option.next];
    setHistory((h) => [
      ...h,
      { sender: "user", text: option.label },
      { sender: "bot", text: nextNode.message },
    ]);
    setNodeId(option.next);
  }

  function onEscalationSent() {
    const sentNode = CHAT_FLOW.escalation_sent;
    setHistory((h) => [...h, { sender: "bot", text: sentNode.message }]);
    setNodeId("escalation_sent");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-[#0b1f3a] px-4 py-3">
            <p className="text-sm font-semibold text-white">AktivSure Assistant</p>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {history.map((turn, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  turn.sender === "bot"
                    ? "bg-neutral-100 text-neutral-800"
                    : "ml-auto bg-[#c9a24b]/20 text-[#0b1f3a]"
                }`}
              >
                {turn.text}
              </div>
            ))}

            {node.link && (
              <Link
                href={node.link.href}
                className="block max-w-[85%] rounded-lg border border-[#0b1f3a] px-3 py-2 text-center text-sm font-medium text-[#0b1f3a] hover:bg-neutral-50"
              >
                {node.link.label}
              </Link>
            )}

            {nodeId === ESCALATION_FORM_NODE_ID && <EscalationForm onSent={onEscalationSent} />}
          </div>

          {node.options.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-neutral-100 p-3">
              {node.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => choose(option)}
                  className="rounded-full border border-[#0b1f3a] px-3 py-1.5 text-xs font-medium text-[#0b1f3a] hover:bg-[#0b1f3a] hover:text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b1f3a] text-white shadow-lg hover:bg-[#12305c]"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.5 0-2.91-.32-4.15-.9L3 20l1.05-3.15A7.94 7.94 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
