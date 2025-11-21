import StateStore from '../public/js/src/services/StateStore.js';

describe('StateStore', () => {
  let store;

  beforeEach(() => {
    store = new StateStore();
    store.state.lessons = [
      { id: 1, title: 'Test Lesson', category: 'CSS' },
      { id: 2, title: 'Another Lesson', category: 'HTML' }
    ];
  });

  test('getLessonById should return correct lesson', () => {
    const lesson = store.getLessonById(1);
    expect(lesson.title).toBe('Test Lesson');
  });

  test('getFilteredLessons should return all lessons for empty query', () => {
    const lessons = store.getFilteredLessons();
    expect(lessons).toHaveLength(2);
  });

  test('getFilteredLessons should filter by search query', () => {
    store.state.searchQuery = 'Test';
    const lessons = store.getFilteredLessons();
    expect(lessons).toHaveLength(1);
    expect(lessons[0].title).toBe('Test Lesson');
  });

  test('updateProgress should update user progress', () => {
    store.updateProgress(1, 100);
    expect(store.state.userProgress[1].completed).toBe(true);
    expect(store.state.userProgress[1].score).toBe(100);
  });
});
