export const PercentageColor = (per) => {
  switch (true) {
    case per > 90:
      return '#22f576';
    case per > 80:
      return '#22f530';
    case per > 70:
      return '#61f522';
    case per > 60:
      return '#c9e322';
    case per > 50:
      return '#e3a322';
    case per > 40:
      return '#e35222';
    case per <= 40:
      return '#e32522';
    default:
      return '#000';
  }
};
