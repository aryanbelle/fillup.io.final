import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the Next.js build
console.log('Running Next.js build...');
try {
  // We're not running the build here since it's already run in the package.json script
  // execSync('next build', { stdio: 'inherit' });
  console.log('Build already executed via package.json script');
} catch (error) {
  console.error('Build failed, but continuing with fixes...');
}

// Check if the problematic directory exists
const problematicDir = join('.next', 'server', 'app', '(root)');
if (fs.existsSync(problematicDir)) {
  console.log(`Problematic directory found: ${problematicDir}`);
  
  // Create a backup of the directory
  const backupDir = join('.next', 'server', 'app', 'root-backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Copy important files from the problematic directory to the backup
  fs.readdirSync(problematicDir).forEach(file => {
    const srcPath = join(problematicDir, file);
    const destPath = join(backupDir, file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcPath} to ${destPath}`);
    }
  });
  
  // Check for the specific problematic file
  const problematicFile = join(problematicDir, 'page_client-reference-manifest.js');
  if (fs.existsSync(problematicFile)) {
    console.log(`Problematic file found: ${problematicFile}`);
    
    // Create an empty file if it doesn't exist
    const fixedFile = join('.next', 'server', 'app', 'main', 'page_client-reference-manifest.js');
    const fixedDir = dirname(fixedFile);
    
    if (!fs.existsSync(fixedDir)) {
      fs.mkdirSync(fixedDir, { recursive: true });
    }
    
    if (!fs.existsSync(fixedFile)) {
      fs.writeFileSync(fixedFile, '// Fixed file');
      console.log(`Created fixed file: ${fixedFile}`);
    }
  }
  
  console.log('Build completed with fixes for problematic directory.');
} else {
  console.log('No problematic directory found, build completed successfully.');
} 