import { layout } from "./layout.js";

export function aboutPage() {
  const body = `
  <section class="wrap section narrow">
    <h1>About Paul</h1>
    <p>Paul Kortepeter is an author of children&rsquo;s books and middle-grade fiction. He also authored the <em>Writing &amp; Rhetoric</em> series for Classical Academic Press.</p>
    <p>His career has taken some unexpected turns. While a master&rsquo;s student at USC&rsquo;s film school, Paul edited a documentary about homelessness that was nominated for an Academy Award. He then spent six years in Los Angeles developing made-for-TV movies.</p>
    <p>After moving to Indiana, Paul became senior editor at Sunrise Publications, where he met Texas artist Susan Wheeler. Their collaboration led to picture books published by Dutton Children&rsquo;s Books.</p>
    <p>Paul also helped found <a href="https://www.theoaksacademy.org/" target="_blank" rel="noopener">The Oaks Academy</a>, a classical school in Indianapolis that now serves 1,100 students. His work in publishing, education, and film has given him a particular interest in creating books that reenchant the world and help young people see it anew through eyes of wonder.</p>
    <a class="btn btn-secondary" href="/blog">Read the Blog &rarr;</a>
  </section>
  `;

  return layout({
    title: "About &mdash; Paul Kortepeter",
    description: "Author of children's books, middle-grade fiction, and the Writing & Rhetoric series for Classical Academic Press.",
    body,
    activeNav: "about",
  });
}
