var contextMenuItem = {
  "id": "openAll",
  "title": "Открыть выделенные ссылки",
  "contexts": ["selection"]
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create(contextMenuItem);
});

chrome.contextMenus.onClicked.addListener( (clickData) => contextMenuHandler(clickData));

function contextMenuHandler(clickData) {
  if (clickData.menuItemId === 'openAll' && clickData.selectionText) {
    var allLinks = getAllLinks(clickData.selectionText);
    openAllLinks(allLinks, clickData.pageUrl);
  }
}

function getAllLinks(selectionText) {
  var regExp = /\((.+?)\)/gm;
  return [...selectionText.matchAll(regExp)];
}

function openAllLinks(links, currentUrl) {
  links.forEach((elem) => {
    var newLink = currentUrl + elem[1];
    chrome.tabs.create({ url: newLink });
  })
}


