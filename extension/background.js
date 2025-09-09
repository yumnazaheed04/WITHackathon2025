chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkDeepfake",
    title: "Check for Deepfake",
    contexts: ["image", "video"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "checkDeepfake") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        fetch("http://localhost:5000/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url })
        })
          .then(res => res.json())
          .then(data => alert(`Deepfake check: ${data.label} (${Math.round(data.score * 100)}%)`));
      },
      args: [info.srcUrl]
    });
  }
});
