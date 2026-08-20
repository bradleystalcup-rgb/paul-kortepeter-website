import { layout } from "./layout.js";

export function adminLoginPage({ error } = {}) {
  const body = `
  <section class="wrap section narrow admin-auth">
    <h1>Admin Login</h1>
    ${error ? `<p class="form-error">${error}</p>` : ""}
    <form method="post" action="/admin/login" class="stack-form">
      <label>Username
        <input type="text" name="username" autocomplete="username" required>
      </label>
      <label>Password
        <input type="password" name="password" autocomplete="current-password" required>
      </label>
      <button class="btn btn-primary" type="submit">Log in</button>
    </form>
  </section>
  `;

  return layout({ title: "Admin Login", body, activeNav: "" });
}
