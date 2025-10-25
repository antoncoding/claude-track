# Claude Track

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
4. Install plugin: `/plugin install claude-track@your-marketplace`

## Usage

Start Claude Code - the plugin automatically:
1. Launches HTTP server on port 3333
2. Opens browser to task management UI
3. Creates TODO.md in your project root
4. Updates progress after each tool use

## Local Development (pnpm)

```bash
pnpm install --dir server
pnpm --dir server run build
pnpm --dir server start
```

The workspace is defined at the repo root (`pnpm-workspace.yaml`) so you can also run commands from the top level:

```bash
pnpm install
pnpm -C server run dev
```

## Share via Marketplace

This repo now doubles as a local marketplace (`.claude-plugin/marketplace.json`). To let teammates install Claude Track:

1. Share the repo path (or host it on Git/GitHub)
2. In Claude Code, run:
   ```
   /plugin marketplace add /full/path/to/claude-track
   ```
3. Install the plugin from that marketplace:
   ```
   /plugin install claude-track@claude-track-marketplace
   ```
4. Restart Claude Code so the hooks start the server automatically.

To bundle this marketplace with a project repo, add the following to that project's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "claude-track-marketplace": {
      "source": {
        "source": "path",
        "path": "/full/path/to/claude-track"
      }
    }
  },
  "enabledPlugins": ["claude-track@claude-track-marketplace"]
}
```

## Testing in Claude Code

1. Add the marketplace and install the plugin (steps above)
2. Open the Claude terminal logs to confirm the SessionStart hook builds the server
3. The plugin will launch http://localhost:3333 automatically—verify the UI shows "Loading tasks..."
4. Trigger a tool (e.g., `Write` or `Bash`) so the PostToolUse hook runs `update-progress`
5. Inspect `${CLAUDE_PROJECT_DIR}/TODO.md` to confirm the writer updates tasks correctly

If you prefer manual testing without Claude, run `pnpm --dir server dev` and open the same URL.

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
