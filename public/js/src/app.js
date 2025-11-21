import StateStore from './services/StateStore.js';
import Router from './services/Router.js';
import LessonService from './services/LessonService.js';
import LessonCard from './components/LessonCard.js';
import QuizComponent from './components/QuizComponent.js';
import LessonView from './views/LessonView.js';

class App {
  constructor() {
    this.store = new StateStore();
    this.router = new Router(this.store);
    this.lessonService = new LessonService();
    this.quizComponent = new QuizComponent(this.store);
    this.lessonView = new LessonView(this.store);
    
    this.init();
  }

  async init() {
    const lessons = await this.lessonService.loadLessons();
    this.store.setState({ lessons });
    this.store.subscribe(this);
    this.render();
    
    this.setupThemeToggle();
    this.setupSearch();
  }

  render() {
    const state = this.store.state;
    const appRoot = document.getElementById('app-root');
    
    if (!appRoot) return;

    switch (state.currentView) {
      case 'home':
        this.renderHome();
        break;
      case 'lessons':
        this.renderLessons();
        break;
      case 'lesson':
        appRoot.innerHTML = this.lessonView.render();
        break;
      case 'quiz':
        appRoot.innerHTML = this.quizComponent.render();
        break;
      case 'suggest':
        this.renderSuggest();
        break;
      default:
        this.renderHome();
    }
  }

  renderHome() {
    const appRoot = document.getElementById('app-root');
    const featuredLessons = this.store.state.lessons.slice(0, 3);
    
    const lessonCards = featuredLessons.map(lesson => {
      const card = new LessonCard(lesson, this.store);
      return card.render();
    }).join('');
    
    appRoot.innerHTML = `
      <section class="welcome-section">
        <h2>Welcome to CodeFlash</h2>
        <p>Master web development concepts through interactive flashcards and quizzes.</p>
      </section>

      <section class="search-section">
        <input type="search" id="searchInput" class="search-input" placeholder="Search lessons...">
      </section>

      <section class="featured-lessons">
        <h3>Featured Topics</h3>
        <div class="lesson-grid">
          ${lessonCards}
        </div>
        
        <div class="view-all-section">
          <button class="button button--primary" onclick="app.router.navigateTo('lessons')">
            View All Lessons
          </button>
        </div>
      </section>
    `;

    this.setupSearch();
  }

  renderLessons() {
    const appRoot = document.getElementById('app-root');
    const lessons = this.store.getFilteredLessons();
    
    const lessonCards = lessons.map(lesson => {
      const card = new LessonCard(lesson, this.store);
      return card.render();
    }).join('');
    
    appRoot.innerHTML = `
      <section class="lessons-view">
        <header class="lessons-header">
          <h2>All Lessons</h2>
          <div class="search-section">
            <input type="search" id="searchInput" class="search-input" placeholder="Search lessons..." value="${this.store.state.searchQuery}">
          </div>
        </header>
        
        <div class="lesson-grid">
          ${lessonCards.length > 0 ? lessonCards : '<p class="no-results">No lessons found. Try a different search.</p>'}
        </div>
      </section>
    `;

    this.setupSearch();
  }

  renderSuggest() {
    const appRoot = document.getElementById('app-root');
    
    appRoot.innerHTML = `
      <section class="suggest-view">
        <h2>Suggest a New Topic</h2>
        
        <form id="suggestionForm" class="suggestion-form">
          <div class="form-group">
            <label for="topicTitle" class="form-label">Topic Title</label>
            <input type="text" id="topicTitle" class="form-input" required>
          </div>

          <div class="form-group">
            <label for="topicCategory" class="form-label">Category</label>
            <select id="topicCategory" class="form-select" required>
              <option value="">Select a category</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="accessibility">Accessibility</option>
            </select>
          </div>

          <div class="form-group">
            <label for="topicDescription" class="form-label">Topic Description</label>
            <textarea id="topicDescription" class="form-textarea" required></textarea>
          </div>

          <button type="submit" class="button button--primary">Submit Suggestion</button>
        </form>
      </section>
    `;

    this.setupSuggestionForm();
  }

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        this.store.setState({ searchQuery: event.target.value });
        if (this.store.state.currentView === 'lessons') {
          this.renderLessons();
        }
      });
    }
  }

  setupSuggestionForm() {
    const form = document.getElementById('suggestionForm');
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your suggestion! It has been submitted.');
        form.reset();
      });
    }
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = this.store.state.theme === 'light' ? 'dark' : 'light';
        this.store.setState({ theme: newTheme });
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = newTheme === 'light' ? '🌙' : '☀️';
        const label = newTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
        themeToggle.textContent = icon;
        themeToggle.setAttribute('aria-label', label);
      });
    }
  }

  startLesson(lessonId) {
    this.router.navigateTo('lesson', lessonId);
  }

  startQuiz(lessonId) {
    this.router.navigateTo('quiz', lessonId);
  }

  submitQuiz(lessonId, correctAnswer) {
    const selectedOption = document.querySelector('input[name="quiz-answer"]:checked');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!selectedOption) {
      alert('Please select an answer!');
      return;
    }

    const userAnswer = parseInt(selectedOption.value);
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
      this.store.updateProgress(lessonId, 100);
      resultDiv.innerHTML = `
        <div class="quiz-result-correct">
          <h4>✅ Correct!</h4>
          <p>Well done! You've completed this lesson.</p>
          <button class="button button--primary" onclick="app.router.navigateTo('lessons')">
            Continue Learning
          </button>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="quiz-result-incorrect">
          <h4>❌ Incorrect</h4>
          <p>Don't worry! Review the lesson and try again.</p>
          <button class="button button--secondary" onclick="app.router.navigateTo('lesson', ${lessonId})">
            Review Lesson
          </button>
        </div>
      `;
    }
    
    resultDiv.style.display = 'block';
  }
}

const app = new App();
window.app = app;

export default App;
