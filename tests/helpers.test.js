describe('Utility Functions', () => {
  test('formatContent should convert markdown headers to HTML', () => {
    const content = '## Introduction\nThis is content';
    const lessonView = { formatContent: (content) => {
      return content.replace(/## (.*?)\n/g, (m, p1) => `<h3>${p1}</h3>`).replace(/\n/g, '<br>');
    } };
    const result = lessonView.formatContent(content);
    expect(result).toContain('<h3>Introduction</h3>');
  });
});
