import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";

export function adminEditorPage({ post, isNew, error }) {
  const action = isNew ? "/admin/posts/new" : `/admin/posts/${post.id}/edit`;

  const body = `
  <section class="wrap section narrow">
    <div class="page-heading">
      <h1>${isNew ? "New Post" : "Edit Post"}</h1>
      <a href="/admin">&larr; Back to posts</a>
    </div>
    ${error ? `<p class="form-error">${error}</p>` : ""}
    <form method="post" action="${action}" class="stack-form">
      <label>Section
        <select name="section">
          <option value="blog" ${post.section === "blog" ? "selected" : ""}>Blog</option>
          <option value="faq" ${post.section === "faq" ? "selected" : ""}>Writing &amp; Rhetoric FAQ</option>
        </select>
      </label>
      <label>Title
        <input type="text" name="title" value="${escapeHtml(post.title)}" required>
      </label>
      <label>Slug <span class="hint">(leave blank to auto-generate from the title)</span>
        <input type="text" name="slug" value="${escapeHtml(post.slug)}">
      </label>
      <label>Excerpt <span class="hint">(shown on the blog list page)</span>
        <textarea name="excerpt" rows="2">${escapeHtml(post.excerpt)}</textarea>
      </label>
      <label>Cover image path <span class="hint">(e.g. /images/writing-lesson-renoir.jpg — optional)</span>
        <input type="text" name="cover_image" value="${escapeHtml(post.cover_image)}">
      </label>
      <label>Cover image focus <span class="hint">(which part of the image to keep on crop — try "top", "center", "bottom", or a precise "30% 70%"; leave blank for the site default of "top")</span>
        <input type="text" name="cover_focus" value="${escapeHtml(post.cover_focus)}">
      </label>
      <label>Source note <span class="hint">(e.g. "Originally published in The American Spectator, July 2022" — optional)</span>
        <input type="text" name="source_note" value="${escapeHtml(post.source_note)}">
      </label>
      <label>Content <span class="hint">(Markdown)</span>
        <textarea name="content" rows="20" class="content-editor" required>${escapeHtml(post.content)}</textarea>
      </label>
      <label class="checkbox-label">
        <input type="checkbox" name="published" ${post.published ? "checked" : ""}>
        Published
      </label>
      <button class="btn btn-primary" type="submit">Save Post</button>
    </form>
  </section>
  `;

  return layout({ title: isNew ? "New Post — Admin" : "Edit Post — Admin", body, activeNav: "" });
}
