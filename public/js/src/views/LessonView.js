class LessonView {
  constructor(store) {
    this.store = store;
  }

  render() {
    const lessonId = this.store.state.currentParam;
    const lesson = this.store.getLessonById(lessonId);
    if (!lesson) return '<p>Lesson not found.</p>';

    return `
      <section class="lesson-view">
        <header class="lesson-header">
          <button class="button button--secondary" onclick="app.router.navigateTo('lessons')">
            ← Back to Lessons
          </button>
          <h2>${lesson.title}</h2>
          <button class="button button--primary" onclick="app.startQuiz(${lesson.id})">
            Take Quiz
          </button>
        </header>
        
        <div class="lesson-content">
          <div class="lesson-meta">
            <span class="lesson-category">${lesson.category}</span>
            <span class="lesson-difficulty">${lesson.difficulty}</span>
          </div>
          
          <div class="lesson-body">
            ${this.formatContent(lesson.content)}
          </div>
        </div>
      </section>
    `;
  }

  formatContent(content) {
    return content.replace(/## (.*?)\n/g, '<h3>$1</h3>')
                  .replace(/\n/g, '<br>');
  }
}

export default LessonView;
