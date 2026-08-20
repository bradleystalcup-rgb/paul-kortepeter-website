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

export function homePage({ posts }) {
  const body = `
  <section class="hero" style="background-image:url('/images/adirondack-sunrise.jpg')">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-kicker">Author &middot; Educator</p>
      <h1>Paul Kortepeter</h1>
      <p class="hero-tagline">Books and essays that reenchant the world &mdash; helping young people see it anew through eyes of wonder.</p>
      <a class="btn btn-primary" href="/blog">Read the Blog</a>
    </div>
  </section>

  <section class="wrap section">
    <div class="about-grid">
      <div>
        <h2>About Paul</h2>
        <p>Paul Kortepeter is an author of children&rsquo;s books and middle-grade fiction, and the author of the <em>Writing &amp; Rhetoric</em> series for Classical Academic Press. His career has taken some unexpected turns: while a master&rsquo;s student at USC&rsquo;s film school, he edited a documentary about homelessness that was nominated for an Academy Award, then spent six years in Los Angeles developing made-for-TV movies.</p>
        <p>After moving to Indiana, Paul became senior editor at Sunrise Publications, where he met Texas artist Susan Wheeler; their collaboration led to picture books published by Dutton Children&rsquo;s Books. He also helped found <a href="https://www.theoaksacademy.org/" target="_blank" rel="noopener">The Oaks Academy</a>, a classical school in Indianapolis that now serves 1,100 students.</p>
        <p>His work in publishing, education, and film has given him a particular interest in creating books that help young people see the world anew, through eyes of wonder.</p>
        <a class="btn btn-secondary" href="/about">More about Paul &rarr;</a>
      </div>
      <div class="work-cards">
        <div class="work-card">
          <h3>Writing &amp; Rhetoric</h3>
          <p>A 12-book composition series rooted in the ancient progymnasmata, published by Classical Academic Press.</p>
          <a href="https://classicalacademicpress.com/pages/writing-rhetoric" target="_blank" rel="noopener">Explore the series &rarr;</a>
        </div>
        <div class="work-card">
          <h3>The Oaks Academy</h3>
          <p>A classical school in Indianapolis, co-founded by Paul, now serving 1,100 students.</p>
        </div>
        <div class="work-card">
          <h3>Picture Books</h3>
          <p>Collaborations with artist Susan Wheeler, published by Dutton Children&rsquo;s Books.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="wrap section">
    <div class="section-heading">
      <h2>Latest from the Blog</h2>
      <a href="/blog" class="section-heading-link">View all posts &rarr;</a>
    </div>
    <div class="post-grid">
      ${posts.map(postCard).join("\n")}
    </div>
  </section>
  `;

  return layout({
    title: "Paul Kortepeter",
    description: "Author of children's books, middle-grade fiction, and the Writing & Rhetoric series for Classical Academic Press.",
    body,
    activeNav: "home",
  });
}
