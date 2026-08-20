import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";
import { formatDate } from "../dates.js";

function postCard(post) {
  const image = post.cover_image
    ? `<div class="card-image" style="background-image:url('${escapeHtml(post.cover_image)}')"></div>`
    : `<div class="card-image card-image--blank"></div>`;
  return `
  <a class="post-card" href="/blog/${escapeHtml(post.slug)}">
    ${image}
    <div class="post-card-body">
      <time class="post-date">${formatDate(post.created_at)}</time>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
    </div>
  </a>`;
}

export function blogListPage({ posts }) {
  const body = `
  <section class="wrap section">
    <div class="page-heading">
      <h1>Blog</h1>
      <p>Essays on classical education, writing, and culture.</p>
    </div>
    <div class="post-grid">
      ${posts.length ? posts.map(postCard).join("\n") : `<p>No posts yet &mdash; check back soon.</p>`}
    </div>
  </section>
  `;

  return layout({
    title: "Blog &mdash; Paul Kortepeter",
    description: "Essays on classical education, writing, and culture by Paul Kortepeter.",
    body,
    activeNav: "blog",
  });
}
