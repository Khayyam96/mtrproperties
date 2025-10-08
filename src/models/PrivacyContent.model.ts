export interface PrivacyPolicyResponse {
  id: number;
  content: string;
}

export function isPrivacyPolicyResponse(data: unknown): data is PrivacyPolicyResponse {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Record<string, unknown>;
  return typeof obj.id === "number" && typeof obj.content === "string";
}

export const getPrivacyHtml = (data?: PrivacyPolicyResponse | null): string =>
  data?.content ?? "";

export function htmlToPlainText(html: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
