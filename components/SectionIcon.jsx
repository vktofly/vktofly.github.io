export default function SectionIcon({ section }) {
  const icons = {
    Philosophy: '🧠',
    Mission: '🎯',
    Work: '💼',
    Companies: '🏢',
    Research: '🔬',
    Principles: '⚖️',
    Influences: '📚',
    'Current Inquiry': '🔍',
    'Beyond Entrepreneurship': '🚀',
    'Selected Works': '📝',
    Connect: '📧',
  };

  return <span className="mr-2">{icons[section] || '📄'}</span>;
}

