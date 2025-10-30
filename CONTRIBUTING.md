# Contributing to EduNexus 🎓

Thank you for your interest in contributing to EduNexus! We welcome contributions from developers of all skill levels. This document will guide you through the contribution process.

## 🎃 Hacktoberfest 2025

EduNexus is participating in **Hacktoberfest 2025**! We encourage you to contribute and help make this project even better.

### What is Hacktoberfest?
Hacktoberfest is a month-long celebration of open source software run by DigitalOcean. During the month of October, we invite you to join open-source software enthusiasts, beginners, and the developer community by contributing to open-source projects.

### How to Participate
1. Register at [hacktoberfest.com](https://hacktoberfest.com)
2. Make 4 quality pull requests to participating repositories
3. Get your contributions reviewed and merged
4. Earn exclusive Hacktoberfest swag!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed
- Basic knowledge of MERN stack

### Setting Up Development Environment

#### Step 1: Fork and Clone

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page
   - This creates a copy of the repository in your GitHub account

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/edunexus.git
   cd edunexus
   ```

3. **Add upstream remote** (to sync with original repository)
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/edunexus.git
   ```

#### Step 2: Environment Setup

1. **Install Prerequisites**
   - Node.js 18+ ([Download](https://nodejs.org/))
   - MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/atlas))
   - Git ([Download](https://git-scm.com/))

2. **Set up the backend**
   ```bash
   cd server
   npm install
   
   # Copy and configure environment file
   cp env.example .env
   
   # Edit .env file with your settings:
   # - Set MONGODB_URI to your database
   # - Set JWT_SECRET to a secure random string
   # - Configure Cloudinary (optional)
   ```

3. **Configure Backend Environment**
   
   Edit `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/edunexus_dev
   JWT_SECRET=your-development-jwt-secret-min-32-characters
   SESSION_SECRET=your-session-secret-for-oauth
   
   # Optional: Cloudinary for file uploads
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. **Set up the frontend**
   ```bash
   cd ../client  # Navigate to client directory
   npm install
   
   # Create frontend environment file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

5. **Start development servers**
   
   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   ```

6. **Verify setup**
   - Backend: http://localhost:5000/api/health
   - Frontend: http://localhost:5173
   - You should see the EduNexus landing page

#### Step 3: Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   # or
   git checkout -b docs/documentation-update
   ```

2. **Keep your fork updated**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   git push origin main
   ```

3. **Make your changes**
   - Write code following our style guidelines
   - Test your changes thoroughly
   - Add comments for complex logic

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # Follow conventional commit format
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Then create a Pull Request on GitHub
   ```

#### Step 4: Testing Your Setup

1. **Test Backend API**
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   
   # Test signup
   curl -X POST http://localhost:5000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"Test123!","role":"student"}'
   ```

2. **Test Frontend**
   - Navigate to http://localhost:5173
   - Try creating an account
   - Test login functionality
   - Browse courses page

3. **Test Database Connection**
   - Check backend console for "Connected to MongoDB"
   - Verify no connection errors

#### Troubleshooting Setup Issues

**MongoDB Connection Issues:**
```bash
# Check if MongoDB is running
# Windows: sc query MongoDB
# macOS: brew services list | grep mongodb
# Linux: sudo systemctl status mongod

# Start MongoDB if not running
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Port Conflicts:**
```bash
# Check what's using port 5000
# Windows: netstat -ano | findstr :5000
# macOS/Linux: lsof -i :5000

# Kill process if needed
# Windows: taskkill /PID <PID> /F
# macOS/Linux: kill -9 <PID>
```

**Node Modules Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Environment Variables Not Loading:**
- Ensure `.env` files are in correct directories
- Check file names (`.env` not `.env.example`)
- Restart servers after changing environment variables

#### Development Tips

1. **Use separate terminals** for backend and frontend
2. **Check console logs** for errors and debugging info
3. **Use browser dev tools** for frontend debugging
4. **Test API endpoints** with tools like Postman or curl
5. **Keep dependencies updated** but test thoroughly
6. **Follow existing code patterns** in the project

## 🎯 How to Contribute

### 1. Choose an Issue
- Browse our [Issues](https://github.com/yourusername/edunexus/issues)
- Look for issues labeled with:
  - `good first issue` - Perfect for beginners
  - `hacktoberfest` - Hacktoberfest-friendly issues
  - `help wanted` - We need community help
  - `bug` - Bug fixes needed
  - `enhancement` - New features or improvements

### 2. Types of Contributions We Welcome

#### 🐛 **Bug Fixes**
- Fix existing bugs
- Improve error handling
- Resolve UI/UX issues

#### ✨ **New Features**
- Add new functionality
- Improve existing features
- Enhance user experience

#### 📚 **Documentation**
- Improve README
- Add code comments
- Create tutorials or guides
- Update API documentation

#### 🎨 **UI/UX Improvements**
- Enhance visual design
- Improve accessibility
- Add animations or transitions
- Mobile responsiveness fixes

#### 🧪 **Testing**
- Add unit tests
- Add integration tests
- Improve test coverage
- Add end-to-end tests

#### ⚡ **Performance**
- Optimize database queries
- Improve loading times
- Reduce bundle size
- Add caching mechanisms

## 📋 Contribution Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Use meaningful variable and function names

### Commit Messages
Follow the conventional commit format:
```
type(scope): description

Examples:
feat(auth): add Google OAuth integration
fix(chat): resolve message duplication issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

### Pull Request Process

1. **Before Starting**
   - Comment on the issue you want to work on
   - Wait for assignment to avoid duplicate work
   - Discuss your approach if it's a complex feature

2. **Development**
   - Keep your changes focused and atomic
   - Test your changes thoroughly
   - Ensure your code follows the project's style
   - Update documentation if needed

3. **Submitting PR**
   - Create a descriptive pull request title
   - Fill out the PR template completely
   - Link the related issue(s)
   - Add screenshots for UI changes
   - Request review from maintainers

4. **After Submission**
   - Respond to review feedback promptly
   - Make requested changes
   - Keep your branch updated with main

## 🏷️ Issue Labels

| Label | Description |
|-------|-------------|
| `good first issue` | Perfect for newcomers |
| `hacktoberfest` | Hacktoberfest-friendly |
| `help wanted` | Community help needed |
| `bug` | Something isn't working |
| `enhancement` | New feature or request |
| `documentation` | Improvements to docs |
| `frontend` | Frontend-related |
| `backend` | Backend-related |
| `ui/ux` | User interface/experience |
| `performance` | Performance improvements |
| `testing` | Testing-related |

## 🎃 Hacktoberfest-Specific Guidelines

### Quality Standards
- **No spam PRs**: Low-quality PRs will be marked as spam
- **Meaningful contributions**: Focus on adding real value
- **Follow guidelines**: Adhere to our contribution guidelines
- **Be respectful**: Maintain a positive and inclusive environment

### Hacktoberfest Issues
We've specially curated issues for Hacktoberfest participants:
- Beginner-friendly tasks
- Well-documented requirements
- Clear acceptance criteria
- Mentorship available

## 🛠️ Development Tips

### Backend Development
- Use proper error handling with try-catch blocks
- Validate input data before processing
- Follow RESTful API conventions
- Add proper logging for debugging

### Frontend Development
- Use React hooks appropriately
- Implement proper loading states
- Handle errors gracefully
- Ensure responsive design

### Database
- Use proper indexing for queries
- Validate data at schema level
- Handle database connection errors
- Use transactions for complex operations

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

### Writing Tests
- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Mock external dependencies

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Pull Request Comments**: For code-specific discussions

### Mentorship
New contributors can request mentorship by:
1. Commenting on a `good first issue`
2. Asking questions in the issue comments
3. Requesting guidance in your PR

## 🎉 Recognition

### Contributors
All contributors will be:
- Added to our contributors list
- Mentioned in release notes
- Recognized in our README

### Hacktoberfest Participants
Special recognition for Hacktoberfest contributors:
- Hacktoberfest badge in contributor profile
- Special mention in Hacktoberfest summary
- Priority review for quality contributions

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please read our full [Code of Conduct](CODE_OF_CONDUCT.md).

### Key Points
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🚀 What Happens Next?

1. **Review Process**: Maintainers will review your PR within 2-3 days
2. **Feedback**: You may receive feedback or requests for changes
3. **Merge**: Once approved, your PR will be merged
4. **Recognition**: You'll be added to our contributors list

## 📈 Project Roadmap

### Current Focus Areas
- Performance optimizations
- Mobile responsiveness improvements
- Additional authentication methods
- Enhanced admin dashboard
- Real-time notifications
- Advanced search functionality

### Future Plans
- Mobile app development
- Advanced analytics
- AI-powered features
- Multi-language support
- Integration with external tools

## 🙏 Thank You

Thank you for contributing to EduNexus! Your contributions help make education more accessible and engaging for everyone.

---

**Happy Coding! 🎓✨**

*For any questions, feel free to reach out through GitHub issues or discussions.*