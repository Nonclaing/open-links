openAllLinks();

function openAllLinks() {
  const selectedHTML = getHTMLOfSelection();
  const currentURL = window.location.protocol + '//' + window.location.host + window.location.pathname;
  const regExp = /<a[^>]*?href=(["\'])?((?:.(?!\1|>))*.?)\1?/gm
  const allMatches = [...selectedHTML.matchAll(regExp)];
  allMatches.forEach((elem) => {
    let newLink = currentURL + elem[2];
    window.open(newLink, '_blank');
  })
}

function getHTMLOfSelection() {
  var range;
  if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    return range.htmlText;
  } else if (window.getSelection) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
      var clonedSelection = range.cloneContents();
      var div = document.createElement('div');
      div.appendChild(clonedSelection);
      return div.innerHTML;
    } else {
      return '';
    }
  } else {
    return '';
  }
}

