export function layout({ title, description = "", body, activeNav = "" }) {
  const navItem = (href, label, key) =>
    `<a href="${href}" class="nav-link${activeNav === key ? " active" : ""}">${label}</a>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${description ? `<meta name="description" content="${description}">` : ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Libre+Franklin:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<header class="site-header">
  <div class="wrap site-header-inner">
    <a class="brand" href="/">Paul Kortepeter</a>
    <nav class="site-nav">
      ${navItem("/", "Home", "home")}
      ${navItem("/blog", "Blog", "blog")}
      ${navItem("/#about", "About", "about")}
    </nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="site-footer">
  <div class="wrap site-footer-inner">
    <p>&copy; ${new Date().getFullYear()} Paul Kortepeter.</p>
    <p class="site-footer-links"><a href="/blog">Blog</a> &middot; <a href="/#about">About</a> &middot; <a href="/admin">Admin</a></p>
  </div>
</footer>
</body>
</html>`;
}
