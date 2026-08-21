import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";

function postCard(post) {
  const image = post.cover_image
    ? `<div class="card-image" style="background-image:url('${escapeHtml(post.cover_image)}')"></div>`
    : `<div class="card-image card-image--blank"></div>`;
  return `
  <a class="post-card" href="/blog/${escapeHtml(post.slug)}">
    ${image}
    <div class="post-card-body">
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
      <p class="hero-kicker">Author</p>
      <h1>Paul Kortepeter</h1>
      <p class="hero-tagline">Books to reenchant the world.</p>
      <a class="btn btn-primary" href="/blog">Read the Blog</a>
    </div>
  </section>

  <section class="wrap section" id="about">
    <div class="about-grid">
      <div>
        <h2>About Paul</h2>
        <p>Paul Kortepeter is an author of children&rsquo;s books, young adult fiction, and the <em>Writing &amp; Rhetoric</em> series for Classical Academic Press. His career has taken some unexpected turns: while a master&rsquo;s student at USC&rsquo;s film school, he edited a documentary about homelessness that was nominated for an Academy Award. He then spent six years in Los Angeles developing made-for-TV movies.</p>
        <p>After moving to Indiana, Paul became senior editor at Sunrise Publications, where he met Texas artist Susan Wheeler; their collaboration led to picture books published by Dutton Children&rsquo;s Books and Harvest House. He also helped found <a href="https://www.theoaksacademy.org/" target="_blank" rel="noopener">The Oaks Academy</a>, a classical school in Indianapolis that now serves 1,200 students.</p>
        <p>His work in publishing, cinema, and education has given him a particular interest in creating books that help young people see the world anew, through eyes of wonder.</p>
        <img class="about-illustration" src="/images/blizzard-ride.jpg" alt="A boy rides a dark, glowing-eyed horse through a snowstorm">
      </div>
      <div class="work-cards">
        <a class="work-card" href="/books">
          <div class="work-card-image" style="background-image:url('/images/olivers-red-toboggan.jpg')"></div>
          <div class="work-card-body">
            <h3>Picture Books</h3>
            <p>In collaboration with Susan Wheeler.</p>
          </div>
        </a>
        <div class="work-card">
          <div class="work-card-image" style="background-image:url('/images/writing-rhetoric-series.webp')"></div>
          <div class="work-card-body">
            <h3>Writing &amp; Rhetoric</h3>
            <p>A creative approach to the classical Progymnasmata, published by Classical Academic Press.</p>
            <p class="work-card-links">
              <a href="https://classicalacademicpress.com/pages/writing-rhetoric" target="_blank" rel="noopener">Explore the series &rarr;</a>
              <a href="/writing-rhetoric-faq">W&amp;R FAQs &rarr;</a>
            </p>
            <img class="work-card-logo" src="/images/cap-logo.jpg" alt="Classical Academic Press logo">
          </div>
        </div>
        <a class="work-card" href="mailto:paul@paulkortepeter.com">
          <div class="work-card-image" style="background-image:url('/images/wild-boars.png')"></div>
          <div class="work-card-body">
            <h3>Contact Paul</h3>
            <p>paul@paulkortepeter.com</p>
          </div>
        </a>
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
    description: "Author of children's books, young adult fiction, and the Writing & Rhetoric series for Classical Academic Press.",
    body,
    activeNav: "home",
  });
}
