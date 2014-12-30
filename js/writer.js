function initEditor(elementId) {
  var editor = ace.edit(elementId);
  editor.focus();
  editor.setTheme("ace/theme/textmate");
  editor.getSession().setMode("ace/mode/markdown");
  editor.getSession().setUseWrapMode(true);
  editor.renderer.setPadding(25, 10);
  editor.setOptions({
    showPrintMargin: false,
    showGutter: false,
    highlightActiveLine: false,
    fontSize: 18,
    scrollPastEnd: true
  });

  return editor;
}

function updatePreview(editor, $preview) {
  var text = editor.getSession().getValue();
  var markdown = marked(text);
  $preview.html(markdown);
}

function togglePreview(editor, $editor, $preview, $buttonPreview) {
  var wrapLimit = editor.getSession().getWrapLimit();
  if ($editor.hasClass('half')) {
    $editor.removeClass('half');
    $editor.removeClass('pull-left');
    $preview.removeClass('half').removeClass('visible');
    $buttonPreview.removeClass('button-primary');
    maxWrap = wrapLimit * 2;
  } else {
    updatePreview(editor, $preview);
    $editor.addClass('half');
    $editor.addClass('pull-left');
    $preview.addClass('half').addClass('visible');
    $buttonPreview.addClass('button-primary');
    maxWrap = wrapLimit / 2;
  }

  editor.getSession().setWrapLimitRange(null, maxWrap);
}

function showPreview(editor, $editor, $preview, $buttonPreview) {
  var wrapLimit = editor.getSession().getWrapLimit();

  updatePreview(editor, $preview);
  $editor.addClass('half');
  $editor.addClass('pull-left');
  $preview.addClass('half').addClass('visible');
  $buttonPreview.addClass('button-primary');
  maxWrap = wrapLimit / 2;

  editor.getSession().setWrapLimitRange(null, maxWrap);
}

function documentName() {
  var val = $('input.document-name').val();

  if (!val) {
    val = 'writer';
  }

  return val + ".md";
}

function loadSettings(editor, $editor, $preview, $buttonPreview) {
  var previewVisible = WriterStorage.getPreviewMode();
  if (previewVisible == 'visible') {
    showPreview(editor, $editor, $preview, $buttonPreview);
  }
}

$(function() {
  var editorId = 'editor';
  var editor = initEditor(editorId);
  var $editor = $('#' + editorId);
  var $editorContent = $('.ace_content');
  var $preview = $('#preview');
  var $buttonPreview = $('.button-preview');

  loadSettings(editor, $editor, $preview, $buttonPreview)

  $('.button-download').on('click', function(event) {
    var blob = new Blob([editor.getSession().getValue()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, documentName());
  })

  $('.button-preview').on('click', function(event) {
    togglePreview(editor, $editor, $preview, $(this));
    WriterStorage.updatePreviewMode($preview.hasClass('visible'));
  })

  editor.getSession().on('change', function(event) {
    if ($preview.hasClass('visible')) {
      updatePreview(editor, $preview);
    }
  })
})
