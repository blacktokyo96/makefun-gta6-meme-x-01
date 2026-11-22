import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = new URL('./POST.json', import.meta.url);
let post;
try {
  post = JSON.parse(await readFile(source, 'utf8'));
} catch (error) {
  console.error('Invalid POST.json: could not read or parse JSON:', error.message);
  process.exit(1);
}
if (post === null || typeof post !== 'object' || !Object.hasOwn(post, 'url')) {
  console.error('Invalid POST.json: missing url field.');
  process.exit(1);
}
if (typeof post.url !== 'string') {
  console.error('Invalid POST.json: url must be a string.');
  process.exit(1);
}
if (!/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/.test(post.url)) {
  console.error('Invalid POST.json: url must match https://x.com/<handle>/status/<digits>.');
  process.exit(1);
}

const output = process.env.OUTPUT_DIR ?? '/output';
await mkdir(output, { recursive: true });
await copyFile(source, join(output, 'POST.json'));
