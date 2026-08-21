import { layout } from "./layout.js";
import { escapeHtml, renderMarkdown } from "../markdown.js";
import { formatDate } from "../dates.js";

export function blogPostPage({ post, basePath = "/blog", backLabel = "all posts", activeNav = "blog" }) {
  const focus = post.cover_focus ? `background-position:${escapeHtml(post.cover_focus)};` : "";
  const cover = post.cover_image
    ? `<div class="post-hero" style="background-image:url('${escapeHtml(post.cover_image)}');${focus}"></div>`
    : "";

  const body = `
  ${cover}
  <article class="wrap section narrow">
    <p class="post-date">${formatDate(post.created_at)}</p>
    <h1>${escapeHtml(post.title)}</h1>
    ${post.source_note ? `<p class="source-note">${escapeHtml(post.source_note)}</p>` : ""}
    <div class="prose">${renderMarkdown(post.content)}</div>
    <p><a href="${basePath}">&larr; Back to ${escapeHtml(backLabel)}</a></p>
  </article>
  `;

  return layout({
    title: `${post.title} — Paul Kortepeter`,
    description: post.excerpt,
    body,
    activeNav,
  });
}
