import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

// Post content is only ever written by the logged-in admin, so we render
// straight to HTML without sanitizing — same trust model as WordPress
// letting an editor use the HTML block.
export function renderMarkdown(markdown) {
  return marked.parse(markdown || "");
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
