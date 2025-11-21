class LessonService {
  constructor() {
    this.lessons = [];
  }

  async loadLessons() {
    try {
      const response = await fetch('../data/db.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.lessons = data.lessons;
      return this.lessons;
    } catch (error) {
      console.error('Failed to load lessons:', error);
      return [];
    }
  }

  searchLessons(query) {
    if (!query) return this.lessons;
    const lowerQuery = query.toLowerCase();
    return this.lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(lowerQuery) ||
      lesson.description.toLowerCase().includes(lowerQuery) ||
      lesson.category.toLowerCase().includes(lowerQuery)
    );
  }

  getLessonsByCategory(category) {
    return this.lessons.filter(lesson => lesson.category === category);
  }

  getQuiz(lessonId) {
    const lesson = this.lessons.find(l => l.id === parseInt(lessonId));
    return lesson ? lesson.quiz : null;
  }
}

export default LessonService;
