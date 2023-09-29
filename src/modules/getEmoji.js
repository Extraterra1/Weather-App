export default (section, value) => {
  if (section === 'temp') {
    if (value > 30) return '🥵';
    if (value >= 15 && value < 30) return '😀';
    if (value > 0 && value < 15) return '🤧';
    if (value < 0) return '🥶';
  }
};
