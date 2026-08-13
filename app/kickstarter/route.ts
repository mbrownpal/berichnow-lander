import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  const htmlPath = join(process.cwd(), 'public', 'kickstarter-temp.html');
  const html = await readFile(htmlPath, 'utf-8');
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
