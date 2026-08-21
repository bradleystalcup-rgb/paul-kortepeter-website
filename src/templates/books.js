import { layout } from "./layout.js";

export function booksPage() {
  const body = `
  <article class="wrap section narrow">
    <h1>Picture Books</h1>
    <p>In collaboration with artist Susan Wheeler, published by Dutton Children&rsquo;s Books and Harvest House.</p>

    <section class="books-coming-soon">
      <h2>Coming in 2027</h2>
      <p>Two new board books &mdash; details coming soon.</p>
    </section>

    <div class="book-grid">
      <div class="book-card">
        <img src="/images/olivers-red-toboggan.jpg" alt="Oliver's Red Toboggan book cover">
        <h3>Oliver&rsquo;s Red Toboggan</h3>
        <p class="book-series">Holly Pond Hill</p>
      </div>
    </div>
  </article>
  `;

  return layout({
    title: "Picture Books — Paul Kortepeter",
    description: "Picture books by Paul Kortepeter, in collaboration with artist Susan Wheeler.",
    body,
    activeNav: "",
  });
}
