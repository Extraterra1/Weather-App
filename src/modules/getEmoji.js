export default (section, value) => {
  if (section === 'temp') {
    if (value >= 30) return '🥵';
    if (value >= 15 && value < 30) return '😀';
    if (value > 0 && value < 15) return '🤧';
    if (value < 0) return '🥶';
  }
  if (section === 'condition') {
    if (value === 'Partly cloudy') return '🌤️';
    if (value === 'Sunny') return '☀️';
    if (value === 'Fog') return '🌫️';
    if (value === 'Overcast') return '☁️';
    if (value === 'Clear') return '😎';
    if (value.includes('rain')) return '🌧️';
  }
};
