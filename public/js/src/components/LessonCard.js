class LessonCard {
  constructor(lesson, store) {
    this.lesson = lesson;
    this.store = store;
  }

  render() {
    const progress = this.store.state.userProgress[this.lesson.id];
    const completedClass = progress ? 'lesson-card--completed' : '';
    
    return `
      <article class="lesson-card ${completedClass}" data-lesson-id="${this.lesson.id}">
        <header class="lesson-card__header">
          <h3 class="lesson-card__title">${this.lesson.title}</h3>
          <span class="lesson-card__difficulty">${this.lesson.difficulty}</span>
        </header>
        
        <div class="lesson-card__content">
          <p class="lesson-card__description">${this.lesson.description}</p>
          <div class="lesson-card__meta">
            <span class="lesson-card__category">${this.lesson.category}</span>
            ${progress ? '<span class="lesson-card__completed">✅ Completed</span>' : ''}
          </div>
        </div>
        
        <footer class="lesson-card__footer">
          <button class="button button--primary" onclick="app.startLesson(${this.lesson.id})">
            ${progress ? 'Review' : 'Start Lesson'}
          </button>
          <button class="button button--secondary" onclick="app.startQuiz(${this.lesson.id})">
            Take Quiz
          </button>
        </footer>
      </article>
    `;
  }
}

export default LessonCard;
