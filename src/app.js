import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

import { listPosts, getPostBySlug, getPostById, createPost, updatePost, deletePost } from "./db.js";
import { verifyPassword, signSession, verifySession } from "./crypto.js";
import { homePage } from "./templates/home.js";
import { blogListPage } from "./templates/blog-list.js";
import { blogPostPage } from "./templates/blog-post.js";
import { writingRhetoricFaqPage } from "./templates/writing-rhetoric-faq.js";
import { booksPage } from "./templates/books.js";
import { adminLoginPage } from "./templates/admin-login.js";
import { adminDashboardPage } from "./templates/admin-dashboard.js";
import { adminEditorPage } from "./templates/admin-editor.js";

const SESSION_COOKIE = "session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function createApp() {
  const app = new Hono();

  // ---- Public site -------------------------------------------------------

  app.get("/", async (c) => {
    const posts = await listPosts(c.env.DB, { onlyPublished: true });
    return c.html(homePage({ posts: posts.slice(0, 3) }));
  });

  app.get("/about", (c) => c.redirect("/#about"));

  app.get("/writing-rhetoric-faq", (c) => c.html(writingRhetoricFaqPage()));

  app.get("/books", (c) => c.html(booksPage()));

  app.get("/blog", async (c) => {
    const posts = await listPosts(c.env.DB, { onlyPublished: true });
    return c.html(blogListPage({ posts }));
  });

  app.get("/blog/:slug", async (c) => {
    const post = await getPostBySlug(c.env.DB, c.req.param("slug"), { onlyPublished: true });
    if (!post) return c.notFound();
    return c.html(blogPostPage({ post }));
  });

  // ---- Admin auth ---------------------------------------------------------

  app.get("/admin/login", (c) => c.html(adminLoginPage()));

  app.post("/admin/login", async (c) => {
    const form = await c.req.formData();
    const username = String(form.get("username") || "");
    const password = String(form.get("password") || "");

    const validUsername = username === c.env.ADMIN_USERNAME;
    const validPassword = await verifyPassword(password, c.env.ADMIN_PASSWORD_HASH);

    if (!validUsername || !validPassword) {
      return c.html(adminLoginPage({ error: "Invalid username or password." }), 401);
    }

    const token = await signSession({ sub: username, exp: Date.now() + SESSION_TTL_MS }, c.env.SESSION_SECRET);
    setCookie(c, SESSION_COOKIE, token, {
      httpOnly: true,
      secure: new URL(c.req.url).protocol === "https:",
      sameSite: "Lax",
      path: "/",
      maxAge: SESSION_TTL_MS / 1000,
    });
    return c.redirect("/admin");
  });

  app.post("/admin/logout", (c) => {
    deleteCookie(c, SESSION_COOKIE, { path: "/" });
    return c.redirect("/admin/login");
  });

  // ---- Admin (protected) --------------------------------------------------

  const admin = new Hono();

  admin.use("*", async (c, next) => {
    const token = getCookie(c, SESSION_COOKIE);
    const session = token ? await verifySession(token, c.env.SESSION_SECRET) : null;
    if (!session) return c.redirect("/admin/login");
    c.set("session", session);
    await next();
  });

  admin.get("/", async (c) => {
    const posts = await listPosts(c.env.DB);
    return c.html(adminDashboardPage({ posts }));
  });

  admin.get("/posts/new", (c) => {
    const blank = { title: "", slug: "", excerpt: "", cover_image: "", source_note: "", content: "", published: true };
    return c.html(adminEditorPage({ post: blank, isNew: true }));
  });

  admin.post("/posts/new", async (c) => {
    const form = await c.req.formData();
    const post = postFromForm(form);
    if (!post.title || !post.content) {
      return c.html(adminEditorPage({ post, isNew: true, error: "Title and content are required." }), 400);
    }
    const slug = await createPost(c.env.DB, post);
    return c.redirect(`/blog/${slug}`);
  });

  admin.get("/posts/:id/edit", async (c) => {
    const post = await getPostById(c.env.DB, c.req.param("id"));
    if (!post) return c.notFound();
    return c.html(adminEditorPage({ post, isNew: false }));
  });

  admin.post("/posts/:id/edit", async (c) => {
    const id = c.req.param("id");
    const form = await c.req.formData();
    const post = postFromForm(form);
    if (!post.title || !post.content) {
      return c.html(adminEditorPage({ post: { ...post, id }, isNew: false, error: "Title and content are required." }), 400);
    }
    const slug = await updatePost(c.env.DB, id, post);
    return c.redirect(`/blog/${slug}`);
  });

  admin.post("/posts/:id/delete", async (c) => {
    await deletePost(c.env.DB, c.req.param("id"));
    return c.redirect("/admin");
  });

  app.route("/admin", admin);

  return app;
}

function postFromForm(form) {
  return {
    title: String(form.get("title") || "").trim(),
    slug: String(form.get("slug") || "").trim(),
    excerpt: String(form.get("excerpt") || "").trim(),
    cover_image: String(form.get("cover_image") || "").trim(),
    source_note: String(form.get("source_note") || "").trim(),
    content: String(form.get("content") || ""),
    published: form.get("published") === "on",
  };
}
