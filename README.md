# Claude Code Todo Tracker

Visual task management interface with drag-and-drop prioritization for Claude Code workflows.

## Features

- 🎯 Forces Claude to break work into trackable tasks
- 📊 Real-time progress visualization
- 🔄 Drag-and-drop task reprioritization
- 📝 Automatic TODO.md synchronization
- 🌐 Web UI on localhost:3333

## Installation

1. Create a local marketplace directory
2. Clone/copy this plugin to the marketplace
3. Add marketplace: `/plugin marketplace add /path/to/marketplace`
4. Install plugin: `/plugin install claude-todo-tracker@your-marketplace`

## Usage

Start Claude Code - the plugin automatically:
1. Launches HTTP server on port 3333
2. Opens browser to task management UI
3. Creates TODO.md in your project root
4. Updates progress after each tool use

## TODO.md Format

```markdown
# Tasks for Project Name

## Current Task
- [ ] Current task description @id:current @priority:0

## Upcoming Tasks
- [ ] Task 1 @id:task-1 @priority:1
- [ ] Task 2 @id:task-2 @priority:2

## Metadata
- Total: 3 tasks
- Completed: 0 tasks
- Progress: 0%
```

## Documentation References

- Plugin system: https://docs.claude.com/en/docs/claude-code/plugins
- Hooks: https://docs.claude.com/en/docs/claude-code/hooks
- Skills: https://docs.claude.com/en/docs/claude-code/skills
