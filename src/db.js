// Thin query layer around the D1 `posts` table.

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listPosts(db, { onlyPublished = false } = {}) {
  const query = onlyPublished
    ? "SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC"
    : "SELECT * FROM posts ORDER BY created_at DESC";
  const { results } = await db.prepare(query).all();
  return results;
}

export async function getPostBySlug(db, slug, { onlyPublished = false } = {}) {
  const query = onlyPublished
    ? "SELECT * FROM posts WHERE slug = ? AND published = 1"
    : "SELECT * FROM posts WHERE slug = ?";
  return db.prepare(query).bind(slug).first();
}

export async function getPostById(db, id) {
  return db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
}

export async function createPost(db, post) {
  const now = new Date().toISOString();
  const slug = post.slug ? slugify(post.slug) : slugify(post.title);
  await db
    .prepare(
      `INSERT INTO posts (slug, title, excerpt, content, cover_image, source_note, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      slug,
      post.title,
      post.excerpt || "",
      post.content,
      post.cover_image || null,
      post.source_note || null,
      post.published ? 1 : 0,
      now,
      now
    )
    .run();
  return slug;
}

export async function updatePost(db, id, post) {
  const now = new Date().toISOString();
  const slug = post.slug ? slugify(post.slug) : slugify(post.title);
  await db
    .prepare(
      `UPDATE posts
       SET slug = ?, title = ?, excerpt = ?, content = ?, cover_image = ?, source_note = ?, published = ?, updated_at = ?
       WHERE id = ?`
    )
    .bind(
      slug,
      post.title,
      post.excerpt || "",
      post.content,
      post.cover_image || null,
      post.source_note || null,
      post.published ? 1 : 0,
      now,
      id
    )
    .run();
  return slug;
}

export async function deletePost(db, id) {
  await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}
