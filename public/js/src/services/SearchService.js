import debounce from '../utils/debounce.js';
import LessonService from './LessonService.js';

class SearchService {
    constructor(delay = 300) {
        this.lessonService = new LessonService();
        this.debouncedSearch = debounce(this.search.bind(this), delay);
    }

    async search(query) {
        if (!query.trim()) {
            return this.lessonService.getAllLessons();
        }

        const lessons = await this.lessonService.searchLessons(query);
        return lessons;
    }

    async handleInput(event) {
        const query = event.target.value;
        return new Promise(resolve => {
            this.debouncedSearch(query, resolve);
        });
    }
}

export default SearchService;

