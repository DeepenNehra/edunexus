# GitHub Setup Guide for EduNexus 🚀

This guide will help you set up your EduNexus project on GitHub and prepare it for Hacktoberfest 2025.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account created
- Your EduNexus project ready locally

## 🚀 Step-by-Step Setup

### 1. Initialize Git Repository (if not already done)

```bash
# Navigate to your project root
cd path/to/your/edunexus-project

# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: EduNexus Mini LMS"
```

### 2. Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `edunexus` or `edunexus-mini-lms`
   - **Description**: `A comprehensive Learning Management System built with MERN stack. Participating in Hacktoberfest 2025! 🎃`
   - **Visibility**: Public (required for Hacktoberfest)
   - **Initialize with**: Don't check any boxes (we already have files)
5. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/edunexus.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4. Set Up Repository Settings

#### Enable Issues and Discussions
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Features" section
4. Ensure "Issues" is checked ✅
5. Check "Discussions" ✅ (optional but recommended)

#### Set Up Branch Protection (Recommended)
1. In Settings, go to "Branches"
2. Click "Add rule"
3. Branch name pattern: `main`
4. Check these options:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators
5. Save changes

### 5. Add Repository Topics

1. Go to your repository main page
2. Click the gear icon ⚙️ next to "About"
3. Add these topics:
   ```
   mern-stack
   learning-management-system
   react
   nodejs
   mongodb
   express
   hacktoberfest
   hacktoberfest2025
   education
   lms
   javascript
   open-source
   ```
4. Add website URL if you have deployed the app
5. Save changes

### 6. Create Initial Issues for Hacktoberfest

Use the issues from `HACKTOBERFEST_ISSUES.md`:

1. Go to "Issues" tab
2. Click "New Issue"
3. Choose "Hacktoberfest Issue" template
4. Create 5-10 initial issues with different difficulty levels
5. Make sure to add appropriate labels:
   - `hacktoberfest`
   - `good first issue` (for beginner-friendly issues)
   - `help wanted`
   - `bug`, `enhancement`, `documentation`, etc.

### 7. Set Up Labels

Create these labels in your repository:

1. Go to Issues → Labels
2. Create these labels:

| Label | Color | Description |
|-------|-------|-------------|
| `hacktoberfest` | `#ff6b35` | Hacktoberfest issues |
| `good first issue` | `#7057ff` | Good for newcomers |
| `help wanted` | `#008672` | Extra attention is needed |
| `bug` | `#d73a4a` | Something isn't working |
| `enhancement` | `#a2eeef` | New feature or request |
| `documentation` | `#0075ca` | Improvements or additions to documentation |
| `frontend` | `#1d76db` | Frontend related |
| `backend` | `#0e8a16` | Backend related |
| `ui/ux` | `#e99695` | User interface and experience |
| `performance` | `#fbca04` | Performance improvements |
| `testing` | `#f9d0c4` | Testing related |

### 8. Create Project Boards (Optional)

1. Go to "Projects" tab
2. Click "New project"
3. Choose "Board" template
4. Name it "Hacktoberfest 2025"
5. Add columns:
   - To Do
   - In Progress
   - Review
   - Done

### 9. Set Up GitHub Actions

The CI/CD workflow is already created in `.github/workflows/ci.yml`. It will:
- Run tests on pull requests
- Check code quality
- Ensure builds work

### 10. Add Repository Badges

Add these badges to your README (already included):

```markdown
[![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange.svg)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![First Timers Only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](https://www.firsttimersonly.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/edunexus)](https://github.com/YOUR_USERNAME/edunexus/issues)
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/edunexus)](https://github.com/YOUR_USERNAME/edunexus/stargazers)
```

## 🎃 Hacktoberfest Preparation

### 1. Register Your Repository

1. Go to [Hacktoberfest.com](https://hacktoberfest.com)
2. Sign in with GitHub
3. Register as a maintainer
4. Add your repository to Hacktoberfest

### 2. Prepare for Contributors

1. **Review all documentation** - Make sure README, CONTRIBUTING.md, and CODE_OF_CONDUCT.md are complete
2. **Create diverse issues** - Have issues for different skill levels
3. **Set up templates** - Issue and PR templates are already created
4. **Plan your time** - Be ready to review PRs during October

### 3. Promote Your Repository

1. **Social Media** - Share on Twitter, LinkedIn, etc.
2. **Dev Communities** - Post in relevant Discord servers, Reddit communities
3. **University Groups** - Share with computer science student groups
4. **Hacktoberfest Events** - Mention at local Hacktoberfest meetups

## 📊 Monitoring and Analytics

### GitHub Insights
- Monitor repository traffic
- Track contributor activity
- Review pull request metrics

### Useful Commands

```bash
# Check repository status
git status

# Pull latest changes
git pull origin main

# Create new branch for features
git checkout -b feature/new-feature

# Push changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

## 🎯 Success Metrics

Track these metrics during Hacktoberfest:
- Number of contributors
- Pull requests submitted
- Issues resolved
- Repository stars
- Community engagement

## 🆘 Troubleshooting

### Common Issues

1. **Push rejected**: Usually means you need to pull latest changes first
   ```bash
   git pull origin main
   git push origin main
   ```

2. **Merge conflicts**: Resolve conflicts in your editor, then:
   ```bash
   git add .
   git commit -m "Resolve merge conflicts"
   git push origin main
   ```

3. **Large files**: Use Git LFS for files over 100MB
   ```bash
   git lfs track "*.mp4"
   git add .gitattributes
   ```

## 📞 Getting Help

- **GitHub Docs**: [docs.github.com](https://docs.github.com)
- **Hacktoberfest Guide**: [hacktoberfest.com/participation](https://hacktoberfest.com/participation)
- **Git Tutorial**: [git-scm.com/docs/gittutorial](https://git-scm.com/docs/gittutorial)

## 🎉 You're Ready!

Your repository is now set up for Hacktoberfest 2025! 🎃

### Next Steps:
1. ✅ Repository created and configured
2. ✅ Documentation complete
3. ✅ Issues created
4. ✅ Labels and templates set up
5. 🔄 Register for Hacktoberfest (when registration opens)
6. 🔄 Promote your repository
7. 🔄 Review and merge contributions

**Happy Hacktoberfest! 🎃✨**