ALTER TABLE posts ADD COLUMN section TEXT NOT NULL DEFAULT 'blog';

CREATE INDEX idx_posts_section_published_created ON posts (section, published, created_at DESC);
