const fs = require('fs');
const path = require('path');

// This script is executed after `next build` to ensure that Vercel's output
// file tracing step finds the expected client-reference-manifest for the
// (chat) route group root page. In some cases, Next.js 15 fails to emit this
// file, but the Vercel packager still tries to trace it, causing the build to
// fail with ENOENT. We create a minimal empty file so the lstat succeeds.

const target = path.join(
  __dirname,
  '..',
  '.next',
  'server',
  'app',
  '(chat)',
  'page_client-reference-manifest.js',
);

// Ensure parent directory exists (it should after build)
fs.mkdirSync(path.dirname(target), { recursive: true });

if (!fs.existsSync(target)) {
  fs.writeFileSync(
    target,
    '// auto-generated placeholder to satisfy Vercel packager – see scripts/create-client-reference.js\n',
    'utf8',
  );
  console.log('[postbuild] created placeholder', target);
} else {
  console.log('[postbuild] placeholder already exists, skipping');
} 