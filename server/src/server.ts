import express from 'express';
import cors from 'cors';
import path from 'path';
import { TodoParser } from './todo-parser';
import { TodoWriter } from './todo-writer';
import { TodoData, UpdateTodosRequest } from './types';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../ui')));

const todoPath = process.env.CLAUDE_PROJECT_DIR 
  ? path.join(process.env.CLAUDE_PROJECT_DIR, 'TODO.md')
  : path.join(process.cwd(), 'TODO.md');

const parser = new TodoParser(todoPath);
const writer = new TodoWriter(todoPath);

// GET /api/todos
app.get('/api/todos', async (req, res) => {
  try {
    const data: TodoData = await parser.parse();
    res.json(data);
  } catch (error) {
    console.error('Error parsing TODO.md:', error);
    res.status(500).json({ error: 'Failed to parse TODO.md' });
  }
});

// POST /api/todos
app.post('/api/todos', async (req, res) => {
  try {
    const { tasks }: UpdateTodosRequest = req.body;
    await writer.updateTasks(tasks);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating TODO.md:', error);
    res.status(500).json({ error: 'Failed to update TODO.md' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', todoPath });
});

app.listen(PORT, () => {
  console.log(`Todo tracker server running on http://localhost:${PORT}`);
  console.log(`Watching TODO.md at: ${todoPath}`);
});
