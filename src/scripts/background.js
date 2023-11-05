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
    getCurrentTab().then((tab) => {
      chrome.scripting.executeScript({
        target: {tabId: tab.id, allFrames: true},
        files: ['src/scripts/open-all.js'],
      });
    });
  }
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
