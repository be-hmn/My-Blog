// components/post-list.js

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import styles from '../app/index.module.css';

export default function PostList({ posts }) {
  const [order, setOrder] = useState('desc');
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState('');

  const allTags = useMemo(() => {
    const counts = {};
    posts.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const visible = useMemo(() => {
    const filtered = posts.filter((p) => {
      const tagOk = !activeTag || p.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const queryOk = !q
        || p.title.toLowerCase().includes(q)
        || p.summary.toLowerCase().includes(q);
      return tagOk && queryOk;
    });
    return filtered.sort((a, b) => (order === 'desc'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)));
  }, [posts, activeTag, query, order]);

  return (
    <>
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', margin: '1rem 0',
      }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목·요약 검색"
          style={{ padding: '6px 10px', flex: 1, minWidth: 180 }}
        />
        <button type="button" onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}>
          {order === 'desc' ? '최신순 ↓' : '오래된순 ↑'}
        </button>
      </div>

      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem',
      }}
      >
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          style={{ fontWeight: activeTag ? 400 : 700 }}
        >
          {`전체 (${posts.length})`}
        </button>
        {allTags.map(([tag, count]) => (
          <button
            type="button"
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            style={{ fontWeight: tag === activeTag ? 700 : 400 }}
          >
            {`${tag} (${count})`}
          </button>
        ))}
      </div>

      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        {`${visible.length}개의 글`}
      </p>

      <ol className={styles.posts}>
        {visible.map((post) => (
          <li key={post.id} className={styles.post}>
            <h3 className={styles.postTitle}>
              <Link href={`/article/${post.slug}`}>{post.title}</Link>
            </h3>
            {post.summary && <p className={styles.postDescription}>{post.summary}</p>}
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              {new Date(post.date).toLocaleDateString('ko-KR')}
              {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
