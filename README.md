# Aptitude Quiz App

A comprehensive offline desktop quiz application built with Next.js, Tailwind CSS, and Electron. Test your knowledge in Reasoning, Aptitude, English, and Mathematics with detailed explanations and progress tracking.

## Features

### 🎯 Core Features
- **Four Subject Areas**: Logical Reasoning, Quantitative Aptitude, English Language, and Mathematics
- **Offline Operation**: Fully functional without internet connection
- **Local Data Storage**: All questions and progress stored locally
- **Responsive Design**: Works perfectly on all screen sizes

### 📊 Quiz Experience
- **5 Questions per Subject**: Carefully curated MCQs for each topic
- **Detailed Explanations**: Every question includes comprehensive explanations
- **Progress Tracking**: Real-time progress indicators during quizzes
- **Time Tracking**: Monitor time spent on each question and overall quiz

### 📈 Analytics & Progress
- **Comprehensive Statistics**: Track performance across all subjects
- **Score Distribution**: Visual breakdown of your performance levels
- **Subject-wise Analysis**: Detailed stats for each subject area
- **Recent Results**: Quick access to your latest quiz attempts

### 🎨 User Experience
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Smooth Navigation**: Seamless transitions between different sections
- **Answer Review**: Detailed review of all answers with explanations
- **Progress Persistence**: Your progress is saved automatically

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom animations
- **Desktop**: Electron for cross-platform desktop app
- **Icons**: Lucide React for beautiful, consistent icons
- **State Management**: React Context API with useReducer
- **Data Storage**: Local JSON files with localStorage for persistence

## Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Development Setup

1. **Clone or download the project files**
   ```bash
   cd apptitude-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Run as Electron app (development)**
   ```bash
   npm run electron-dev
   ```

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Create desktop executable**
   ```bash
   npm run dist
   ```
   
   This will create platform-specific executables in the `dist` folder:
   - **macOS**: `.dmg` file
   - **Windows**: `.exe` installer
   - **Linux**: `.AppImage` file

## Project Structure

```
apptitude-test/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application component
├── components/            # React components
│   ├── HomePage.tsx       # Subject selection and dashboard
│   ├── QuizPage.tsx       # Quiz interface
│   ├── ResultsPage.tsx    # Quiz results and summary
│   ├── ReviewPage.tsx     # Detailed answer review
│   └── StatsPage.tsx      # Statistics and analytics
├── contexts/              # React context providers
│   └── QuizContext.tsx    # Quiz state management
├── data/                  # Local data storage
│   └── questions.json     # Quiz questions database
├── electron/              # Electron configuration
│   └── main.js           # Electron main process
├── types/                 # TypeScript type definitions
│   └── index.ts          # Application types
└── package.json          # Dependencies and scripts
```

## Usage Guide

### Starting a Quiz
1. Launch the application
2. Select a subject from the home screen
3. Click "Start Quiz" to begin

### Taking a Quiz
1. Read each question carefully
2. Select your answer by clicking on an option
3. Click "Next Question" to proceed
4. Complete all 5 questions to finish

### Reviewing Results
1. View your score and performance summary
2. Click "Review Answers" for detailed explanations
3. See correct answers and understand your mistakes

### Tracking Progress
1. Click "Statistics" from the home screen
2. View overall performance metrics
3. Analyze subject-wise performance
4. Track improvement over time

## Customization

### Adding New Questions
Edit `data/questions.json` to add new questions:

```json
{
  "subject": [
    {
      "id": 6,
      "question": "Your question here?",
      "options": [
        "Option A",
        "Option B", 
        "Option C",
        "Option D"
      ],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of the correct answer."
    }
  ]
}
```

### Modifying Subjects
To add or modify subjects:
1. Update the `Subject` type in `types/index.ts`
2. Add questions in `data/questions.json`
3. Update subject configurations in components

### Styling Changes
- Modify `tailwind.config.js` for theme customization
- Edit `app/globals.css` for global styles
- Update component-specific styles in individual files

## Building for Distribution

### macOS
```bash
npm run build
npm run dist
```
Creates a `.dmg` installer in the `dist` folder.

### Windows
```bash
npm run build
npm run dist
```
Creates an `.exe` installer in the `dist` folder.

### Linux
```bash
npm run build
npm run dist
```
Creates an `.AppImage` file in the `dist` folder.

## Performance Features

- **Lazy Loading**: Components load only when needed
- **Optimized Images**: All images are optimized for performance
- **Efficient State Management**: Minimal re-renders with optimized context
- **Local Storage**: Fast data access without network requests

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Compatible**: Proper ARIA labels and semantic HTML
- **High Contrast**: Clear visual hierarchy and color contrast
- **Focus Management**: Proper focus handling throughout the app

## Browser Compatibility

- **Chrome/Chromium**: Full support
- **Firefox**: Full support  
- **Safari**: Full support
- **Edge**: Full support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please refer to the project documentation or create an issue in the repository.

---

**Happy Learning! 🎓**
# quiz
# quiz
