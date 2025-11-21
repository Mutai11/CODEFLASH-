import LessonService from '../public/js/src/services/LessonService.js';

describe('LessonService', () => {
  let lessonService;

  beforeEach(() => {
    lessonService = new LessonService();
    lessonService.lessons = [
      {
        id: 1,
        title: 'CSS Grid Basics',
        category: 'CSS',
        description: 'Learn grid layout',
        difficulty: 'Beginner'
      },
      {
        id: 2,
        title: 'JavaScript Arrays',
        category: 'JavaScript',
        description: 'Array methods',
        difficulty: 'Intermediate'
      }
    ];
  });

  test('searchLessons should return matching lessons', () => {
    const results = lessonService.searchLessons('grid');
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe('CSS Grid Basics');
  });

  test('searchLessons should return empty array for no matches', () => {
    const results = lessonService.searchLessons('python');
    expect(results).toHaveLength(0);
  });

  test('getLessonsByCategory should filter by category', () => {
    const cssLessons = lessonService.getLessonsByCategory('CSS');
    expect(cssLessons).toHaveLength(1);
    expect(cssLessons[0].category).toBe('CSS');
  });

  test('getQuiz should return quiz for valid lesson ID', () => {
    lessonService.lessons[0].quiz = [{ question: 'Test?', options: ['A', 'B'], answer: 0 }];
    const quiz = lessonService.getQuiz(1);
    expect(quiz).toBeDefined();
    expect(quiz[0].question).toBe('Test?');
  });
});
