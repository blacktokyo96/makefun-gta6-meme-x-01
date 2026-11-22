import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const output = process.env.OUTPUT_DIR ?? '/output';
await mkdir(output, { recursive: true });
await copyFile(new URL('./POST.json', import.meta.url), join(output, 'POST.json'));
