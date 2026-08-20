import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";
import { formatDate } from "../dates.js";

function row(post) {
  return `
  <tr>
    <td><a href="/admin/posts/${post.id}/edit">${escapeHtml(post.title)}</a></td>
    <td>${post.published ? '<span class="badge badge-published">Published</span>' : '<span class="badge badge-draft">Draft</span>'}</td>
    <td>${formatDate(post.created_at)}</td>
    <td class="admin-row-actions">
      <a href="/blog/${escapeHtml(post.slug)}" target="_blank" rel="noopener">View</a>
      <a href="/admin/posts/${post.id}/edit">Edit</a>
      <form method="post" action="/admin/posts/${post.id}/delete" onsubmit="return confirm('Delete this post? This cannot be undone.')">
        <button type="submit" class="link-button">Delete</button>
      </form>
    </td>
  </tr>`;
}

export function adminDashboardPage({ posts }) {
  const body = `
  <section class="wrap section">
    <div class="page-heading admin-dashboard-heading">
      <h1>Posts</h1>
      <div>
        <a class="btn btn-primary" href="/admin/posts/new">New Post</a>
        <form method="post" action="/admin/logout" class="inline-form">
          <button type="submit" class="btn btn-secondary">Log out</button>
        </form>
      </div>
    </div>
    <table class="admin-table">
      <thead>
        <tr><th>Title</th><th>Status</th><th>Date</th><th></th></tr>
      </thead>
      <tbody>
        ${posts.length ? posts.map(row).join("\n") : `<tr><td colspan="4">No posts yet.</td></tr>`}
      </tbody>
    </table>
  </section>
  `;

  return layout({ title: "Admin — Posts", body, activeNav: "" });
}
