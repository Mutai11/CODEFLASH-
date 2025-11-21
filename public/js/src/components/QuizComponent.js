class QuizComponent {
  constructor(store) {
    this.store = store;
  }

  render() {
    const lessonId = this.store.state.currentParam;
    const lesson = this.store.getLessonById(lessonId);
    if (!lesson || !lesson.quiz) return '<p>Quiz not found.</p>';

    const quiz = lesson.quiz[0];
    
    return `
      <section class="quiz-view">
        <header class="quiz-header">
          <h2>${lesson.title} - Quiz</h2>
          <button class="button button--secondary" onclick="app.router.navigateTo('lesson', ${lessonId})">
            ← Back to Lesson
          </button>
        </header>
        
        <div class="quiz-content">
          <div class="quiz-question">
            <h3>${quiz.question}</h3>
          </div>
          
          <div class="quiz-options">
            ${quiz.options.map((option, index) => `
              <label class="quiz-option">
                <input type="radio" name="quiz-answer" value="${index}">
                <span class="quiz-option-text">${option}</span>
              </label>
            `).join('')}
          </div>
          
          <div class="quiz-actions">
            <button class="button button--primary" onclick="app.submitQuiz(${lessonId}, ${quiz.answer})">
              Submit Answer
            </button>
          </div>
          
          <div id="quiz-result" class="quiz-result" style="display: none;"></div>
        </div>
      </section>
    `;
  }
}

export default QuizComponent;
