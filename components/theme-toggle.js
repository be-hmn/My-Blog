'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ width: 40, height: 40 }} />;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="테마 전환"
      style={{
        width: 40,
        height: 40,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontSize: 20,
      }}
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
