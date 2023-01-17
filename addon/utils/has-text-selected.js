export default function hasTextSelected(input) {
  var ref;
  if (
    input.getAttribute('selectionStart') != null &&
    input.getAttribute('selectionStart') !== input.getAttribute('selectionEnd')
  ) {
    return true;
  }
  if (
    (typeof document !== 'undefined' && document !== null
      ? (ref = document.selection) != null
        ? ref.createRange
        : void 0
      : void 0) != null
  ) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
}
