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

const isTrue = (value: string | undefined): boolean => value?.trim().toLowerCase() === "true";

/**
 * Reads SMTP settings from server-side environment variables. Returns null when
 * any required value is missing, so callers can report "not configured"
 * instead of pretending an email was sent. Never import this from client code.
 */
export function getMailConfig(defaultRecipient: string): MailConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = (process.env.SMTP_FROM ?? user)?.trim();
  if (!host || !user || !pass || !from) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  if (!Number.isInteger(port) || port <= 0) return null;

  const secure = process.env.SMTP_SECURE !== undefined ? isTrue(process.env.SMTP_SECURE) : port === 465;
  const requireTLS =
    process.env.SMTP_REQUIRE_TLS !== undefined ? isTrue(process.env.SMTP_REQUIRE_TLS) : !secure;

  return {
    host,
    port,
    secure,
    requireTLS,
    user,
    pass,
    from,
    to: process.env.CONTACT_TO_EMAIL?.trim() || defaultRecipient,
    cc: process.env.CONTACT_CC_EMAIL?.trim() || undefined,
  };
}

export function createMailTransport(config: MailConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}
