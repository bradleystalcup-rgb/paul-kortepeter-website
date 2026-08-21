// Thin query layer around the D1 `posts` table.
// `section` divides posts between the general blog ("blog") and the
// Writing & Rhetoric FAQ page ("faq") — each has its own listing page.

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listPosts(db, { onlyPublished = false, section } = {}) {
  const conditions = [];
  const params = [];
  if (onlyPublished) conditions.push("published = 1");
  if (section) {
    conditions.push("section = ?");
    params.push(section);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const query = `SELECT * FROM posts ${where} ORDER BY created_at DESC`;
  const { results } = await db.prepare(query).bind(...params).all();
  return results;
}

export async function getPostBySlug(db, slug, { onlyPublished = false, section } = {}) {
  const conditions = ["slug = ?"];
  const params = [slug];
  if (onlyPublished) conditions.push("published = 1");
  if (section) {
    conditions.push("section = ?");
    params.push(section);
  }
  const query = `SELECT * FROM posts WHERE ${conditions.join(" AND ")}`;
  return db.prepare(query).bind(...params).first();
}

export async function getPostById(db, id) {
  return db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
}

export async function createPost(db, post) {
  const now = new Date().toISOString();
  const slug = post.slug ? slugify(post.slug) : slugify(post.title);
  await db
    .prepare(
      `INSERT INTO posts (slug, title, excerpt, content, cover_image, source_note, published, section, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      slug,
      post.title,
      post.excerpt || "",
      post.content,
      post.cover_image || null,
      post.source_note || null,
      post.published ? 1 : 0,
      post.section || "blog",
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
       SET slug = ?, title = ?, excerpt = ?, content = ?, cover_image = ?, source_note = ?, published = ?, section = ?, updated_at = ?
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
      post.section || "blog",
      now,
      id
    )
    .run();
  return slug;
}

export async function deletePost(db, id) {
  await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();
}
