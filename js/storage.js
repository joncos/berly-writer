var WriterStorage = (function() {

  function localStorageAvailable() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  }

  return {
    updatePreviewMode: function(visible) {
      if (!localStorageAvailable()) {
        return false;
      }

      localStorage['berly.writer.settings.previewVisible'] = visible ? 'visible' : 'hidden';
    },

    getPreviewMode: function() {
      if (!localStorageAvailable()) {
        return undefined;
      }

      return localStorage['berly.writer.settings.previewVisible']
    }
  }
})();