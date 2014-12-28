$(function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/textmate");
  editor.getSession().setMode("ace/mode/markdown");
})