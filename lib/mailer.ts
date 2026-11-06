import nodemailer, { type Transporter } from "nodemailer";

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  requireTLS: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  cc?: string;
}

/** Reads an env var, treating missing, blank and whitespace-only values as unset. */
const env = (name: string): string | undefined => {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
};

/** Names (never values) of required SMTP settings that are missing or blank. */
export function getMissingMailSettings(): string[] {
  const missing: string[] = [];
  if (!env("SMTP_HOST")) missing.push("SMTP_HOST");
  if (!env("SMTP_USER")) missing.push("SMTP_USER");
  if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");
  if (!env("SMTP_FROM") && !env("SMTP_USER")) missing.push("SMTP_FROM");
  const port = env("SMTP_PORT");
  if (port !== undefined && !(Number.isInteger(Number(port)) && Number(port) > 0)) missing.push("SMTP_PORT (invalid)");
  return missing;
}

/** True when every required SMTP setting is present. Safe to expose as a yes/no; never expose which one is missing. */
export function isMailConfigured(): boolean {
  return getMissingMailSettings().length === 0;
}

const isTrue = (value: string | undefined): boolean => value?.trim().toLowerCase() === "true";

/**
 * Reads SMTP settings from server-side environment variables. Returns null when
 * any required value is missing, so callers can report "not configured"
 * instead of pretending an email was sent. Never import this from client code.
 */
export function getMailConfig(defaultRecipient: string): MailConfig | null {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = process.env.SMTP_PASS || undefined;
  const from = env("SMTP_FROM") ?? user;
  if (!host || !user || !pass || !from) return null;

  const port = Number(env("SMTP_PORT") ?? 587);
  if (!Number.isInteger(port) || port <= 0) return null;

  const secure = env("SMTP_SECURE") !== undefined ? isTrue(env("SMTP_SECURE")) : port === 465;
  const requireTLS =
    env("SMTP_REQUIRE_TLS") !== undefined ? isTrue(env("SMTP_REQUIRE_TLS")) : !secure;

  return {
    host,
    port,
    secure,
    requireTLS,
    user,
    pass,
    from,
    to: env("CONTACT_TO_EMAIL") ?? defaultRecipient,
    cc: env("CONTACT_CC_EMAIL"),
  };
}

export function createMailTransport(config: MailConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    auth: { user: config.user, pass: config.pass },
    // Certificate verification stays ON (the default). Only modern TLS is accepted.
    tls: { minVersion: "TLSv1.2" },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}
