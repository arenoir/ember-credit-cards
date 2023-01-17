const validKeyCodes = [
  9, // Tab
  8, // Backspace
  46, // Delete
  27, // Escape
  13, // Enter
];

export default function isDigitKeypress(e) {
  var keyCode = e.keyCode || e.which;

  return validKeyCodes.includes(keyCode);
}
