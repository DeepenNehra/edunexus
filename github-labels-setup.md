# GitHub Labels Setup Commands

You can create these labels manually or use GitHub CLI:

## Manual Creation (via GitHub Web Interface)

Go to Issues → Labels → New Label and create:

| Label Name | Color | Description |
|------------|-------|-------------|
| `hacktoberfest` | `#ff6b35` | Hacktoberfest 2025 issues |
| `good first issue` | `#7057ff` | Good for newcomers |
| `help wanted` | `#008672` | Extra attention is needed |
| `bug` | `#d73a4a` | Something isn't working |
| `enhancement` | `#a2eeef` | New feature or request |
| `documentation` | `#0075ca` | Improvements to documentation |
| `frontend` | `#1d76db` | Frontend related (React) |
| `backend` | `#0e8a16` | Backend related (Node.js) |
| `ui/ux` | `#e99695` | User interface and experience |
| `performance` | `#fbca04` | Performance improvements |
| `testing` | `#f9d0c4` | Testing related |
| `accessibility` | `#b60205` | Accessibility improvements |
| `security` | `#ee0701` | Security related |

## Using GitHub CLI (if you have it installed)

```bash
gh label create "hacktoberfest" --color "ff6b35" --description "Hacktoberfest 2025 issues"
gh label create "good first issue" --color "7057ff" --description "Good for newcomers"
gh label create "help wanted" --color "008672" --description "Extra attention is needed"
gh label create "bug" --color "d73a4a" --description "Something isn't working"
gh label create "enhancement" --color "a2eeef" --description "New feature or request"
gh label create "documentation" --color "0075ca" --description "Improvements to documentation"
gh label create "frontend" --color "1d76db" --description "Frontend related (React)"
gh label create "backend" --color "0e8a16" --description "Backend related (Node.js)"
gh label create "ui/ux" --color "e99695" --description "User interface and experience"
gh label create "performance" --color "fbca04" --description "Performance improvements"
gh label create "testing" --color "f9d0c4" --description "Testing related"
gh label create "accessibility" --color "b60205" --description "Accessibility improvements"
gh label create "security" --color "ee0701" --description "Security related"
```