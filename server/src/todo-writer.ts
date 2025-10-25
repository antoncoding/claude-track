import { promises as fs } from 'fs';
import { Task } from './types';

export class TodoWriter {
  constructor(private todoPath: string) {}

  async updateTasks(tasks: Task[]): Promise<void> {
    let projectName = 'Untitled Project';
    try {
      const content = await fs.readFile(this.todoPath, 'utf-8');
      const match = content.match(/# Tasks for (.+)/);
      if (match) projectName = match[1];
    } catch (error) {
      // File doesn't exist
    }

    const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
    const currentTask = sortedTasks.find(t => t.isCurrent);
    const upcomingTasks = sortedTasks.filter(t => !t.isCurrent);

    const total = sortedTasks.length;
    const completed = sortedTasks.filter(t => t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    let md = `# Tasks for ${projectName}\n\n`;
    
    md += `## Current Task\n`;
    if (currentTask) {
      const check = currentTask.completed ? 'x' : ' ';
      md += `- [${check}] ${currentTask.description} @id:${currentTask.id} @priority:${currentTask.priority}\n`;
    }
    md += `\n`;

    md += `## Upcoming Tasks\n`;
    for (const task of upcomingTasks) {
      const check = task.completed ? 'x' : ' ';
      md += `- [${check}] ${task.description} @id:${task.id} @priority:${task.priority}\n`;
    }
    md += `\n`;

    md += `## Metadata\n`;
    md += `- Total: ${total} tasks\n`;
    md += `- Completed: ${completed} tasks\n`;
    md += `- Progress: ${progress}%\n`;

    await fs.writeFile(this.todoPath, md, 'utf-8');
  }
}
