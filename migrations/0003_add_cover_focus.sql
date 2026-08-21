-- Optional per-post override for where a cover image is anchored when
-- cropped (CSS background-position, e.g. "top", "center", "30% 70%").
-- NULL means "use the site default" (top center).
ALTER TABLE posts ADD COLUMN cover_focus TEXT;
