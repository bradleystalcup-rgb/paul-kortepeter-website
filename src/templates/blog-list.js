import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";
import { formatDate } from "../dates.js";

function postCard(post, basePath) {
  const image = post.cover_image
    ? `<div class="card-image" style="background-image:url('${escapeHtml(post.cover_image)}')"></div>`
    : `<div class="card-image card-image--blank"></div>`;
  return `
  <a class="post-card" href="${basePath}/${escapeHtml(post.slug)}">
    ${image}
    <div class="post-card-body">
      <time class="post-date">${formatDate(post.created_at)}</time>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
    </div>
  </a>`;
}

export function blogListPage({
  posts,
  basePath = "/blog",
  title = "Blog",
  intro = "Essays on classical education, writing, and culture.",
  activeNav = "blog",
}) {
  const body = `
  <section class="wrap section">
    <div class="page-heading">
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(intro)}</p>
    </div>
    <div class="post-grid">
      ${posts.length ? posts.map((p) => postCard(p, basePath)).join("\n") : `<p>No posts yet &mdash; check back soon.</p>`}
    </div>
  </section>
  `;

  return layout({
    title: `${escapeHtml(title)} &mdash; Paul Kortepeter`,
    description: intro,
    body,
    activeNav,
  });
}
