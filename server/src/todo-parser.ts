import fs from 'fs/promises';
import { TodoData, Task } from './types';

export class TodoParser {
  constructor(private todoPath: string) {}

  async parse(): Promise<TodoData> {
    try {
      const content = await fs.readFile(this.todoPath, 'utf-8');
      return this.parseContent(content);
    } catch (error) {
      return {
        projectName: 'Untitled Project',
        currentTask: null,
        tasks: [],
        metadata: { total: 0, completed: 0, progress: 0 }
      };
    }
  }

  private parseContent(content: string): TodoData {
    const lines = content.split('\n');
    const tasks: Task[] = [];
    let currentTask: Task | null = null;
    let projectName = 'Untitled Project';
    let inCurrentSection = false;
    let inUpcomingSection = false;

    for (const line of lines) {
      if (line.startsWith('# Tasks for ')) {
        projectName = line.replace('# Tasks for ', '').trim();
        continue;
      }

      if (line.startsWith('## Current Task')) {
        inCurrentSection = true;
        inUpcomingSection = false;
        continue;
      }
      if (line.startsWith('## Upcoming Tasks')) {
        inCurrentSection = false;
        inUpcomingSection = true;
        continue;
      }
      if (line.startsWith('## Metadata')) {
        break;
      }

      const taskMatch = line.match(/^- \[([ x])\] (.+?) @id:(.+?) @priority:(\d+)/);
      if (taskMatch) {
        const task: Task = {
          id: taskMatch[3],
          description: taskMatch[2].trim(),
          priority: parseInt(taskMatch[4]),
          completed: taskMatch[1] === 'x',
          isCurrent: inCurrentSection
        };

        if (inCurrentSection) {
          currentTask = task;
        } else if (inUpcomingSection) {
          tasks.push(task);
        }
      }
    }

    const allTasks = currentTask ? [currentTask, ...tasks] : tasks;
    const completed = allTasks.filter(t => t.completed).length;
    const total = allTasks.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      projectName,
      currentTask,
      tasks,
      metadata: { total, completed, progress }
    };
  }
}
