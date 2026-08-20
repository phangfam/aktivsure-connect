export type ChatOption = {
  label: string;
  next: string;
};

export type ChatNode = {
  id: string;
  message: string;
  link?: { href: string; label: string };
  options: ChatOption[];
};

export const ROOT_NODE_ID = "root";
export const ESCALATION_FORM_NODE_ID = "escalation_form";

export const CHAT_FLOW: Record<string, ChatNode> = {
  root: {
    id: "root",
    message: "Hi! I'm the AktivSure assistant. How can I help?",
    options: [
      { label: "Register a product", next: "register_redirect" },
      { label: "Warranty & product questions", next: "warranty_menu" },
      { label: "Privacy & my data", next: "privacy_menu" },
      { label: "Something else / talk to us", next: "escalation_start" },
    ],
  },
  register_redirect: {
    id: "register_redirect",
    message: "You can register your product on our registration form.",
    link: { href: "/capture", label: "Go to registration form" },
    options: [{ label: "Back to menu", next: "root" }],
  },
  warranty_menu: {
    id: "warranty_menu",
    message: "What would you like to know?",
    options: [
      { label: "How long is my warranty?", next: "warranty_answer_length" },
      { label: "Is it safe to use with medication?", next: "warranty_answer_medical" },
      { label: "Something else", next: "escalation_start" },
      { label: "Back to menu", next: "root" },
    ],
  },
  warranty_answer_length: {
    id: "warranty_answer_length",
    message:
      "Warranty terms depend on the specific product and where you purchased it. Registering your product here confirms your purchase details for warranty support, but doesn't change the terms from your point of sale.",
    link: { href: "/disclaimer", label: "Read the full Disclaimer" },
    options: [
      { label: "Talk to us about this", next: "escalation_start" },
      { label: "Back to menu", next: "root" },
    ],
  },
  warranty_answer_medical: {
    id: "warranty_answer_medical",
    message:
      "AktivSure products are not intended to diagnose, treat, cure, or prevent any disease. Please consult a qualified healthcare professional before use, especially if you have an existing medical condition or take other medication.",
    link: { href: "/disclaimer", label: "Read the full Disclaimer" },
    options: [
      { label: "Talk to us about this", next: "escalation_start" },
      { label: "Back to menu", next: "root" },
    ],
  },
  privacy_menu: {
    id: "privacy_menu",
    message: "What would you like to do?",
    options: [
      { label: "Read the Privacy Policy", next: "privacy_policy_link" },
      { label: "Access, correct, or delete my data", next: "privacy_rights_answer" },
      { label: "Back to menu", next: "root" },
    ],
  },
  privacy_policy_link: {
    id: "privacy_policy_link",
    message: "Here's our full Privacy Policy, including what we collect and why.",
    link: { href: "/privacy", label: "Read the Privacy Policy" },
    options: [{ label: "Back to menu", next: "root" }],
  },
  privacy_rights_answer: {
    id: "privacy_rights_answer",
    message:
      "Under Malaysia's PDPA, you can request access, correction, or deletion of your data, or withdraw consent at any time. Email privacy@aktivsure.com to make a request.",
    options: [
      { label: "Back to menu", next: "root" },
    ],
  },
  escalation_start: {
    id: "escalation_start",
    message: "I'll pass this to the AktivSure team. Want to leave your contact details so we can follow up?",
    options: [
      { label: "Yes, leave my details", next: ESCALATION_FORM_NODE_ID },
      { label: "No, just show me contact info", next: "escalation_contact_info" },
      { label: "Back to menu", next: "root" },
    ],
  },
  escalation_contact_info: {
    id: "escalation_contact_info",
    message: "You can reach AktivSure at privacy@aktivsure.com. We'll get back to you as soon as we can.",
    options: [{ label: "Back to menu", next: "root" }],
  },
  escalation_form: {
    id: ESCALATION_FORM_NODE_ID,
    message: "Leave your details below and we'll follow up.",
    options: [],
  },
  escalation_sent: {
    id: "escalation_sent",
    message: "Thanks — we've received your details and will be in touch.",
    options: [{ label: "Back to menu", next: "root" }],
  },
};
