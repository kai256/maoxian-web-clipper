(function() {
  "use strict";

  /*
   * @param {Object} message: {
   *   fold, mimeTypeDict
   * }
   */
  function messageHandler(message) {
    return new Promise(function(resolve, reject) {
      if (message.to === window.location.href) {
        switch (message.type) {
          case 'frame.toHtml':
            MxWcHtml.getElemHtml(getParams(message), resolve);
            break;
          case 'frame.toMd':
            MxWcMarkdown.getElemHtml(getParams(message), resolve)
            break;
        }
      }
    });
  }

  function getParams(message) {
    const {clipId, frames, path, mimeTypeDict, fetchAssetFirst, saveWebFont} = message.body;
    return {
      clipId: clipId,
      win: window,
      frames: frames,
      path: path,
      elem: document.body,
      refUrl: window.location.href,
      mimeTypeDict: mimeTypeDict,
      parentFrameId: message.frameId,
      fetchAssetFirst: fetchAssetFirst,
      saveWebFont: saveWebFont
    }
  }

  function init() {
    if(window === window.top){
      // Main window
    }else{
      // Iframe
      ExtApi.addMessageListener(messageHandler);
    }
  }

  init();


})();
