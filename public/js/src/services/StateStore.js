class StateStore {
  constructor() {
    this.state = {
      lessons: [],
      currentView: 'home',
      userProgress: JSON.parse(localStorage.getItem('userProgress')) || {},
      theme: localStorage.getItem('theme') || 'light',
      searchQuery: '',
      currentParam: null
    };
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyAll();
    if (newState.userProgress) {
      localStorage.setItem('userProgress', JSON.stringify(newState.userProgress));
    }
    if (newState.theme) {
      localStorage.setItem('theme', newState.theme);
    }
  }

  notifyAll() {
    this.observers.forEach(observer => {
      if (observer && typeof observer.render === 'function') {
        observer.render();
      }
    });
  }

  getLessons() {
    return this.state.lessons;
  }

  getLessonById(id) {
    return this.state.lessons.find(lesson => lesson.id === parseInt(id));
  }

  updateProgress(lessonId, score) {
    const progress = { ...this.state.userProgress };
    progress[lessonId] = { completed: true, score, completedAt: new Date().toISOString() };
    this.setState({ userProgress: progress });
  }

  getFilteredLessons() {
    if (!this.state.searchQuery) return this.state.lessons;
    const query = this.state.searchQuery.toLowerCase();
    return this.state.lessons.filter(lesson => 
      (lesson.title || '').toLowerCase().includes(query) ||
      (lesson.description || '').toLowerCase().includes(query) ||
      (lesson.category || '').toLowerCase().includes(query)
    );
  }
}

export default StateStore;
