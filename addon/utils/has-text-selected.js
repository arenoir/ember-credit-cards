export default function hasTextSelected(target) {
  var ref;
  if ((target.prop('selectionStart') != null) && target.prop('selectionStart') !== target.prop('selectionEnd')) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
}