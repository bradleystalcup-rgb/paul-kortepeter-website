import { layout } from "./layout.js";
import { escapeHtml } from "../markdown.js";

const EXTERNAL_ICON = `<svg class="icon-external" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8.5 5H5.5C4.67157 5 4 5.67157 4 6.5V14.5C4 15.3284 4.67157 16 5.5 16H13.5C14.3284 16 15 15.3284 15 14.5V11.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M9 11L16 4M16 4H11.5M16 4V8.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const FLOURISH = `
<div class="section-divider" aria-hidden="true">
  <svg viewBox="0 0 320 28" preserveAspectRatio="xMidYMid meet">
    <path d="M0 14 H108 M212 14 H320" stroke="currentColor" stroke-width="1"/>
    <path d="M108 14 C 122 4, 128 24, 138 14 C 146 6, 152 22, 160 14 C 168 22, 174 6, 182 14 C 192 24, 198 4, 212 14" stroke="currentColor" stroke-width="1.3" fill="none"/>
    <circle cx="160" cy="14" r="2.6" fill="currentColor"/>
  </svg>
</div>`;

function postCard(post) {
  const focus = post.cover_focus ? `background-position:${escapeHtml(post.cover_focus)};` : "";
  const image = post.cover_image
    ? `<div class="card-image" style="background-image:url('${escapeHtml(post.cover_image)}');${focus}"></div>`
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

  <section class="section-about" id="about">
    <div class="wrap section about-grid">
      <div>
        <h2>About Paul</h2>
        <img class="about-illustration" src="/images/blizzard-ride.jpg" alt="A boy rides a dark, glowing-eyed horse through a snowstorm">
        <p>Paul Kortepeter is the author of children&rsquo;s books, young adult fiction, and the <em>Writing &amp; Rhetoric</em> series for Classical Academic Press. His career has taken some unexpected turns: while a master&rsquo;s student at USC&rsquo;s film school, he edited a documentary about homelessness that was nominated for an Academy Award. He then spent six years in Los Angeles developing made-for-TV movies.</p>
        <p>After moving to Indiana, Paul became senior editor at Sunrise Publications, where he met Texas artist Susan Wheeler; their collaboration led to picture books published by Dutton Children&rsquo;s Books and Harvest House. He also helped found <a href="https://www.theoaksacademy.org/" target="_blank" rel="noopener">The Oaks Academy</a>, a classical school in Indianapolis that now serves 1,200 students.</p>
        <p>His work in publishing, cinema, and education has given him a particular interest in creating books that help young people see the world anew, through eyes of wonder.</p>
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
          <div class="work-card-image" style="background-image:url('/images/writing-rhetoric-series.webp')">
            <img class="work-card-badge" src="/images/cap-logo.jpg" alt="Classical Academic Press logo">
          </div>
          <div class="work-card-body">
            <h3>Writing &amp; Rhetoric</h3>
            <p>A creative approach to the classical Progymnasmata, published by Classical Academic Press.</p>
            <p class="work-card-links">
              <a href="/writing-rhetoric-faq">W&amp;R FAQs</a>
              <a href="https://classicalacademicpress.com/pages/writing-rhetoric" target="_blank" rel="noopener">Explore the series ${EXTERNAL_ICON}</a>
            </p>
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

  ${FLOURISH}

  <section class="section-blog">
    <div class="wrap section">
      <div class="section-heading">
        <h2>Latest from the Blog</h2>
        <a href="/blog" class="section-heading-link">View all posts &rarr;</a>
      </div>
      <div class="post-grid">
        ${posts.map(postCard).join("\n")}
      </div>
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
