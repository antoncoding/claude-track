import fs from 'fs/promises';
import path from 'path';

async function updateProgress() {
  const todoPath = process.env.CLAUDE_PROJECT_DIR 
    ? path.join(process.env.CLAUDE_PROJECT_DIR, 'TODO.md')
    : path.join(process.cwd(), 'TODO.md');

  try {
    const exists = await fs.access(todoPath).then(() => true).catch(() => false);
    if (!exists) {
      console.log('TODO.md not found, skipping update');
      return;
    }

    // Touch file to trigger UI refresh via polling
    const now = new Date();
    await fs.utimes(todoPath, now, now);
  } catch (error) {
    console.error('Error updating progress:', error);
  }
}

updateProgress();
