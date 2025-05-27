import { cpSync } from 'fs';
import { join } from 'path';

const sourceDir = join(process.cwd(), 'assets');
const targetDir = join(process.cwd(), 'public', 'assets');

console.log('Copying assets...');
cpSync(sourceDir, targetDir, { recursive: true, force: true });
console.log('Assets copied successfully!');